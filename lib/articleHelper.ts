import type { Article } from "@/hooks/useArticles";

interface ArticleFilterOptions {
  articles: Article[];
  searchQuery?: string;
}

/**
 * Filters a list of articles based only on search query (ignores category).
 * @param options - An object containing articles and searchQuery.
 * @returns A new array of filtered articles.
 */
export function filterArticles({
  articles,
  searchQuery,
}: ArticleFilterOptions): Article[] {
  if (!searchQuery) return articles;

  const lowerCaseQuery = searchQuery.toLowerCase();

  return articles.filter(
    (article: Article) =>
      article.title.toLowerCase().includes(lowerCaseQuery) ||
      article.content.toLowerCase().includes(lowerCaseQuery)
  );
}
