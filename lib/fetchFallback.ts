export async function fetchWithFallback<T>(
  fetcher: () => Promise<T>,
  fallbackUrl: string
): Promise<T> {
  try {
    return await fetcher();
  } catch (err) {
    console.warn("API failed, using fallback:", fallbackUrl);
    const res = await fetch(fallbackUrl);
    return await res.json();
  }
}