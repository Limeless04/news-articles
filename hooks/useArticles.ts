// hooks/useArticles.ts
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axios';
import { fetchWithFallback } from "@/lib/fetchFallback";

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

// Hook
const useArticles = ({
  page = 1,
  limit = 10,
  category = "",
  search = "",
}: UseArticlesParams = {}): UseArticlesResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const shouldUseLocalFiltering =
        search.trim() !== "" || (category && category !== "all");

      if (shouldUseLocalFiltering) {
        // Fetch all articles to filter locally
        const allRes = await fetchWithFallback(
          () =>
            axiosInstance
              .get<ArticlesApiResponse>("/articles")
              .then((res) => res.data),
          "/data/articles.json"
        );
        let filtered = allRes.data;

        // Filter by category if specified
        if (category && category !== "all") {
          filtered = filtered.filter(
            (a) => a.category?.name?.toLowerCase() === category.toLowerCase()
          );
        }

        // Filter by search if specified
        if (search.trim() !== "") {
          const lowerQuery = search.toLowerCase();
          filtered = filtered.filter(
            (a) =>
              a.title.toLowerCase().includes(lowerQuery) ||
              a.content.toLowerCase().includes(lowerQuery)
          );
        }

        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);

        setArticles(paginated);
        setTotalArticles(filtered.length);
      } else {
        // Server-side pagination
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const res = await axiosInstance.get<ArticlesApiResponse>(
          `/articles?${params.toString()}`
        );

        setArticles(res.data.data);
        setTotalArticles(res.data.total);
      }
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, search]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    totalArticles,
    loading,
    error,
    refetch: fetchArticles,
  };
};

export default useArticles;
