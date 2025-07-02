// src/hooks/useCategories.ts
import {
  fetchAllCategories,
  Category,
  filterCategoriesBySearch,
  getPaginatedCategories,
} from "@/lib/categoryHelper";
import useSWR, { mutate as globalMutate } from "swr";

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

const fetcher = async (page: number, limit: number, search: string) => {
  if (search.trim()) {
    const all = await fetchAllCategories();
    const filtered = filterCategoriesBySearch(all, search);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return {
      data: paginated,
      totalData: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  } else {
    return await getPaginatedCategories(page, limit);
  }
};

export default function useCategories({
  page = 1,
  limit = DEFAULT_LIMIT,
  search = "",
}: UseCategoriesOptions = {}): UseCategoriesResult {
  const key = ["categories", page, limit, search];
  const { data, error, isLoading, mutate } = useSWR(key, () =>
    fetcher(page, limit, search)
  );

  return {
    categories: data?.data ?? [],
    totalCategories: data?.totalData ?? 0,
    currentPage: data?.currentPage ?? page,
    totalPages: data?.totalPages ?? 1,
    loading: isLoading,
    error,
    refetch: () => mutate(),
  };
}
