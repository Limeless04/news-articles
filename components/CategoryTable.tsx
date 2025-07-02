"use client";

import { useState, useEffect, useCallback } from "react"; // Import useCallback
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination"; // Adjust path if necessary
import useCategories from "@/hooks/useCategories"; // The new hook for categories
import CategoryTableLoading from "./loading/CategoryTableLoading";
import { deleteCategory } from "@/lib/categoryService";
import { useModal } from "@/providers/ModalProvider";

const CATEGORIES_PER_PAGE = 10; // Adjust as needed

export default function CategoryTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const { openModal } = useModal();

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      // When search query changes, reset to the first page
      setCurrentPage(1);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {
    categories,
    totalCategories,
    totalPages, // Directly use totalPages from the hook
    loading,
    error,
    refetch,
  } = useCategories({
    page: currentPage, // THIS IS CORRECT
    limit: CATEGORIES_PER_PAGE,
    search: debouncedSearchQuery, // THIS IS CORRECT
  });

  const handleAddCategory = () => {
    openModal("create-category");
  };

  const handleEditCategory = (id: string) => {
    console.log("Category ID: ", id);
    openModal("edit-category", { id: id });
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    openModal("delete", { id: id, name: name, type: "category" });
  };

  // --- Render Loading, Error, or Data ---
  if (loading) {
    return (
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Categories
        </h2>
        <CategoryTableLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center text-red-600 dark:text-red-400">
        <h2 className="text-xl font-bold mb-4">Error Loading Categories</h2>
        <p className="mb-4">
          {error.message || "An unexpected error occurred."}
        </p>
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
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Categories
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <Button
            onClick={handleAddCategory}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300 mb-4">
        Total Categories: <strong>{totalCategories}</strong>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                ID
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Name
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
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-600 dark:text-gray-400"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories
                .slice() // create a shallow copy so you don't mutate the original array
                .sort(
                  (a, b) =>
                    new Date(b.createdAt ?? 0).getTime() -
                    new Date(a.createdAt ?? 0).getTime()
                )
                .map((category) => (
                  <tr
                    key={category.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="px-4 py-2 text-gray-900 dark:text-white">
                      {category.id}
                    </td>
                    <td className="px-4 py-2 text-gray-900 dark:text-white">
                      {category.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {category.createdAt
                        ? new Date(category.createdAt).toLocaleDateString(
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
                          onClick={() => handleEditCategory(category.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() =>
                            handleDeleteCategory(category.id, category.name)
                          }
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {categories.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalCategories}
          itemsPerPage={CATEGORIES_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
