import axiosInstance from "@/lib/axios";
import { fetchWithFallback } from "@/lib/fetchFallback";

export function swrFetcherWithFallback<T>(url: string, fallbackUrl: string): () => Promise<T> {
  return () => fetchWithFallback(() => axiosInstance.get(url).then(res => res.data), fallbackUrl);
}