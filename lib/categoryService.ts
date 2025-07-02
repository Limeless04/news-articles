import axiosInstance from "@/lib/axios";

export interface CategoryPayload {
  name: string;
}

export async function createCategory(payload: CategoryPayload) {
  const res = await axiosInstance.post("/categories", payload);
  return res.data;
}

export async function updateCategory(id: string, payload: CategoryPayload) {
  const res = await axiosInstance.put(`/categories/${id}`, payload);
  return res.data;
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