"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import { useState, useMemo, useEffect } from "react";
import CardLoading from "./loading/CardLoading";
import { articles } from "@/lib/dummyData";
import useArticles from "@/hooks/useArticles";
import type { Article } from "@/hooks/useArticles";
import { Search } from "lucide-react";
import {
  Select, // Import Select components
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { filterArticles } from "@/lib/articleHelper";
import { getUniqueCategories } from "@/lib/categoryHelper";

const ITEMS_PER_PAGE = 9;
export default function ArticleGrid() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const [uniqueCategoryNames, setUniqueCategoryNames] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);

  const { articles, totalArticles, loading, error, refetch } = useArticles({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
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
        const fetched = await getUniqueCategories();
        setUniqueCategoryNames(fetched);
      } catch (err) {
        setCategoriesError(err as Error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchAndSetCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset pagination on filters change
  }, [selectedCategory, debouncedSearchQuery]);


  if (error || categoriesError) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* This div centers the error message in the middle of the screen */}
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Error Loading Data
          </h2>

          {error && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Articles Error: {error.message || "Failed to fetch articles."}
            </p>
          )}
          {categoriesError && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {" "}
              {/* Added mb-4 for space before button */}
              Categories Error:{" "}
              {categoriesError.message || "Failed to fetch categories."}
            </p>
          )}
          {!error &&
            !categoriesError && ( // Fallback for general unexpected error
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                An unexpected error occurred.
              </p>
            )}

          {/* Use Shadcn UI's Button component */}
          <Button
            onClick={() => {
              refetch(); /* Consider also refetching categories if an independent retry is possible */
            }}
            variant="default" // Use your primary button variant, typically "default" or "primary"
            size="lg" // Optional: make the button larger for prominence
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Latest Articles
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Category Filter using Select */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {uniqueCategoryNames.map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Input Field */}
          <div className="relative flex-grow">
            {/* Use flex-grow to take available space */}
            <Input
              type="text"
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading || categoriesLoading ? (
          Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <CardLoading key={i} />
          ))
        ) : articles.length === 0 && articles.length === 0 ? ( // Check both for empty state
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No Articles found.
          </p>
        ) : (
          articles.map((article: Article) => (
            <Card
              key={article.id}
              className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              {/* Ensure article.imageUrl and article.slug exist or handle fallbacks */}
              <Image
                src={article.imageUrl || "https://picsum.photos/400/300"} // Fallback image
                alt={article.title}
                width={400}
                height={300}
                className="w-[400px] h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground text-sm text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: article.content.substring(0, 150) + "...",
                  }}
                />
              </CardContent>
              <CardFooter>
                <Link
                  href={`/articles/${article.id}`} // Fallback for slug
                  className="text-primary hover:underline text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalArticles}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
