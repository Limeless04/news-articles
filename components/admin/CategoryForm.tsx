"use client"

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";
import { Skeleton } from "../ui/skeleton";
import { createCategory, updateCategory } from "@/lib/categoryService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  mode?: "create" | "edit";
  categoryId?: {
    id: string;
  };
  onSuccess?: () => void;
}

export default function CategoryForm({
  mode = "create",
  categoryId,
  onSuccess,
}: CategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const { categories, loading: categoriesLoading, error } = useCategories();

  const router = useRouter();

  // Populate form if in edit mode
  useEffect(() => {
    if (mode === "edit" && categoryId && categories.length > 0) {
      const matched = categories.find((cat) => cat.id === categoryId.id);
      console.log(matched);
      if (matched) {
        form.reset({ name: matched.name });
      }
    }
  }, [mode, categoryId, categories, form]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (mode === "create") {
        await createCategory(data);
        toast.success("Category created successfully");
      } else if (mode === "edit" && categoryId) {
        await updateCategory(categoryId.id, data);
        toast.success("Category updated successfully");
      }
      form.reset();
      onSuccess?.();
    } catch (err) {
      console.error("Failed to submit category form:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === "edit" ? "Edit Category" : "Create Category"}
        </DialogTitle>
      </DialogHeader>

      {categoriesLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : error ? (
        <p className="text-sm text-red-500">Failed to load category data.</p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {mode === "edit" ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </DialogContent>
  );
}
