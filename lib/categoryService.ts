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
