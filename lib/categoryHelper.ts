import axiosInstance from "./axios";
import { fetchWithFallback } from "@/lib/fetchFallback";

export interface Category {
  id: string;
  name: string;
  userId?: string; // Optional if not always present or not needed
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesApiResponse {
  data: Category[]; // An array of individual Category objects
  totalData: number;
  currentPage: number;
  totalPages: number;
}

const FALLBACK_CATEGORIES_URL = "/data/categories.json";

/**
 * Fetches all categories from the API.
 * This is an internal helper now.
 * @returns A promise that resolves to an array of Category objects.
 * It extracts the 'data' array from the full API response.
 * @throws An error if the API call fails.
 */
export async function fetchAllCategories(): Promise<Category[]> {
  // This function should still return Category[]
  return await fetchWithFallback<Category[]>(
    () =>
      axiosInstance
        .get<CategoriesApiResponse>("/categories")
        .then((res) => res.data.data),
    FALLBACK_CATEGORIES_URL
  );
}


/**
 * Filters categories by name or presence of articles.
 * @param categories - The full list of categories to filter.
 * @param search - The search keyword.
 * @returns A filtered array of categories.
 */
export function filterCategoriesBySearch(categories: Category[], search: string): Category[] {
  if (!search.trim()) return categories;

  const keyword = search.trim().toLowerCase();

  return categories.filter(category => {
    const nameMatches = category.name.toLowerCase().includes(keyword);
    // const hasArticles = (category.articles?.length ?? 0) > 0;
    return nameMatches;
  });
}


/**
 * Fetches unique category names from the API, including an "all" option.
 * @returns A promise that resolves to an array of unique category names.
 * @throws An error if the API call for categories fails.
 */
export async function getUniqueCategories(): Promise<string[]> {
  try {
    // `categories` here is already `Category[]` because `fetchAllCategories` returns `Promise<Category[]>`
    const categories = await fetchAllCategories();

    // CORRECT: Directly map over the `categories` array (which is `Category[]`)
    const categoryNames = Array.from(new Set(categories.map((cat) => cat.name)));
    return ["all", ...categoryNames.sort((a, b) => a.localeCompare(b))];
  } catch (error) {
    console.error("Error generating unique categories:", error);
    throw error;
  }
}


export async function getPaginatedCategories(
  page: number = 1,
  limit: number = 10,
): Promise<CategoriesApiResponse> {
  try {
    // Construct query parameters
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const response = await axiosInstance.get<CategoriesApiResponse>(`/categories?${params.toString()}`);
    return response.data; // Return the full response object
  } catch (error) {
    console.error("Failed to fetch paginated categories:", error);
    // Return a default empty response on error
    return {
      data: [],
      totalData: 0,
      currentPage: page,
      totalPages: 1,
    };
  }
}

// Optional: Function to delete a category (implement actual API call)
export async function deleteCategory(id: string): Promise<void> {
  try {
    await axiosInstance.delete(`/categories/${id}`);
    console.log(`Category with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete category ${id}:`, error);
    throw new Error(`Unable to delete category: ${id}`);
  }
}

// Optional: Function to create/update a category (implement actual API call)
// This will depend on your API's PUT/POST structure for categories
export async function saveCategory(categoryData: Partial<Category>): Promise<Category> {
  try {
    let response;
    if (categoryData.id) {
      // Update existing category
      response = await axiosInstance.put(`/categories/${categoryData.id}`, categoryData);
    } else {
      // Create new category
      response = await axiosInstance.post(`/categories`, categoryData);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to save category:`, error);
    throw new Error(`Unable to save category.`);
  }
}