"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, RefreshCw, Search } from "lucide-react";
import { articles } from "@/lib/dummyData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./Pagination";
import useArticles from "@/hooks/useArticles";
import ArticleTableLoading from "./loading/ArticleTableLoading";
import { filterArticles } from "@/lib/articleHelper";
import { getUniqueCategories } from "@/lib/categoryHelper";
import { Input } from "./ui/input";
import type { Article } from "@/hooks/useArticles";
import { de } from "zod/v4/locales";

const ARTICLES_PER_PAGE = 9;

export default function ArticleTable() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  // State for fetched unique category names (from categoryService)
  const [uniqueCategoryNames, setUniqueCategoryNames] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);

  const { articles, totalArticles, loading, error, refetch } = useArticles({
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
    category: selectedCategory,
    search: debouncedSearchQuery,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const fetchedNames = await getUniqueCategories(); // Call the integrated function
        setUniqueCategoryNames(fetchedNames);
      } catch (err) {
        setCategoriesError(err as Error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchAndSetCategories();
  }, []); // Empty dependency array means this runs once on mount


  // --- Reset Pagination when Filters Change ---
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]); // Also reset on search query change

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleAddArticle = () => {
    console.log("Add new article clicked");
  };

  const handleEditArticle = (id: string) => {
    console.log(`Edit article with ID: ${id}`);
  };

  const handleDeleteArticle = (id: string) => {
    console.log(`Delete article with ID: ${id}`);
  };

  if (loading || categoriesLoading) {
    return (
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Articles
        </h2>
        <ArticleTableLoading />
      </div>
    );
  }

  // Combine error states with enhanced styling
  if (error || categoriesError) {
    return (
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
        <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
          Error Loading Articles
        </h2>
        {error && (
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Articles Error: {error.message || "Failed to fetch articles."}
          </p>
        )}
        {categoriesError && (
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Categories Error:{" "}
            {categoriesError.message || "Failed to fetch categories."}
          </p>
        )}
        <Button
          onClick={refetch}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center mx-auto"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {" "}
      {/* Main container styling */}
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {" "}
        {/* Added mb-4 */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Articles
        </h2>{" "}
        {/* Moved heading here */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Category Filter */}
          <Select
            defaultValue="all"
            value={selectedCategory} // Controlled component
            onValueChange={(value) => {
              setSelectedCategory(value);
              // setCurrentPage(1); // Already handled by useEffect on selectedCategory change
            }}
            disabled={categoriesLoading || uniqueCategoryNames.length === 0} // Disable while loading categories
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {uniqueCategoryNames.map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleAddArticle}
            className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Article
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300 mb-4">
        {/* Added mb-4 */}
        Total Articles: <strong>{totalArticles}</strong>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Title
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Category
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Author
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Created At
              </th>
              <th className="px-4 py-2 text-center text-gray-800 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-600 dark:text-gray-400"
                  >
                    No articles found for the current filters.
                  </td>
                </tr>
              </>
            ) : (
              <>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                      {article.title}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                      {article.category.name}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                      {article.user?.username || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                        <Button
                          onClick={() => handleEditArticle(article.id)}
                          variant="outline"
                          size="sm"
                          className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteArticle(article.id)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalArticles}
          itemsPerPage={ARTICLES_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
