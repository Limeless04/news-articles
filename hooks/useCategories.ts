import { useState, useEffect, useCallback } from "react";
import {
  fetchAllCategories,
  Category,
  filterCategoriesBySearch,
  getPaginatedCategories,
} from "@/lib/categoryHelper"; // Import types and service

interface UseCategoriesOptions {
  page?: number;
  limit?: number;
  search?: string;
}

interface UseCategoriesResult {
  categories: Category[];
  totalCategories: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const DEFAULT_LIMIT = 10;

export default function useCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
  search = "",
}: UseCategoriesOptions = {}): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [currentPageState, setCurrentPageState] = useState<number>(page);
  const [totalPagesState, setTotalPagesState] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (search.trim()) {
        // Client-side search
        const all = await fetchAllCategories();
        const filtered = filterCategoriesBySearch(all, search);
        const total = filtered.length;
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);

        setCategories(paginated);
        setTotalCategories(total);
        setCurrentPageState(page);
        setTotalPagesState(Math.ceil(total / limit));
      } else {
        // Normal server-side pagination
        const response = await getPaginatedCategories(page, limit);
        setCategories(response.data);
        setTotalCategories(response.totalData);
        setCurrentPageState(response.currentPage);
        setTotalPagesState(response.totalPages);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
    totalCategories,
    currentPage: currentPageState,
    totalPages: totalPagesState,
    loading,
    error,
    refetch,
  };
}
