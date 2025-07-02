// hooks/useArticles.ts
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axios';
import { fetchWithFallback } from "@/lib/fetchFallback";
import useSWR from "swr";

// Types
interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  role: "User" | "Admin";
}

export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
  imageUrl?: string;
  slug?: string;
}

interface ArticlesApiResponse {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}

interface UseArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

interface UseArticlesResult {
  articles: Article[];
  totalArticles: number;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const FALLBACK_ARTICLES_URL = "/data/articles.json";

// Fetch all articles (for client-side filtering)
const fetchAllArticles = async () =>
  fetchWithFallback<ArticlesApiResponse>(
    () =>
      axiosInstance
        .get<ArticlesApiResponse>("/articles")
        .then((res) => res.data),
    FALLBACK_ARTICLES_URL
  );

// Fetch paginated articles (server-side)
const fetchPaginatedArticles = async (page: number, limit: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  return axiosInstance
    .get<ArticlesApiResponse>(`/articles?${params.toString()}`)
    .then((res) => res.data);
};

// Hook
const useArticles = ({
  page = 1,
  limit = 10,
  category = "",
  search = "",
}: UseArticlesParams = {}): UseArticlesResult => {
  const shouldUseLocalFiltering =
    search.trim() !== "" || (category && category !== "all");

  // SWR for all articles (for client-side filtering)
  const {
    data: allData,
    error: allError,
    isLoading: allLoading,
    mutate: mutateAll,
  } = useSWR(shouldUseLocalFiltering ? "all-articles" : null, fetchAllArticles);

  // SWR for paginated articles (server-side)
  const {
    data: paginatedData,
    error: paginatedError,
    isLoading: paginatedLoading,
    mutate: mutatePaginated,
  } = useSWR(
    !shouldUseLocalFiltering ? ["paginated-articles", page, limit] : null,
    () => fetchPaginatedArticles(page, limit)
  );

  let articles: Article[] = [];
  let totalArticles = 0;
  let loading = false;
  let error: Error | null = null;

  if (shouldUseLocalFiltering) {
    loading = allLoading;
    error = allError as Error | null;
    let filtered = allData?.data ?? [];
    if (category && category !== "all") {
      filtered = filtered.filter(
        (a) => a.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search.trim() !== "") {
      const lowerQuery = search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerQuery) ||
          a.content.toLowerCase().includes(lowerQuery)
      );
    }
    totalArticles = filtered.length;
    const start = (page - 1) * limit;
    articles = filtered.slice(start, start + limit);
  } else {
    loading = paginatedLoading;
    error = paginatedError as Error | null;
    articles = paginatedData?.data ?? [];
    totalArticles = paginatedData?.total ?? 0;
  }

  return {
    articles,
    totalArticles,
    loading,
    error,
    refetch: shouldUseLocalFiltering
      ? () => mutateAll()
      : () => mutatePaginated(),
  };
};

export default useArticles;
