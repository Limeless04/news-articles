"use client";

import { useForm, Controller } from "react-hook-form";
import TiptapEditor from "@/components/tiptap/TiptapEditor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";

const articleSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  mode?: "create" | "edit";
  articleId?: string;
  defaultValues?: Partial<ArticleFormValues>;
  onSuccess?: () => void;
}

export default function ArticleForm({
  mode = "create",
  articleId,
  defaultValues = {},
  onSuccess,
}: ArticleFormProps) {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: defaultValues.title || "",
      content: defaultValues.content || "",
      categoryId: defaultValues.categoryId || "",
    },
  });

  // Populate article data if in edit mode
  useEffect(() => {
    if (mode === "edit" && articleId) {
      setLoading(true);
      setFetchError(null);

      axiosInstance
        .get(`/articles/${articleId}`)
        .then((res) => {
          const { title, content, categoryId } = res.data;
          form.reset({ title, content, categoryId });
        })
        .catch(() => setFetchError("Failed to fetch article data."))
        .finally(() => setLoading(false));
    }
  }, [mode, articleId, form]);

  const onSubmit = async (data: ArticleFormValues) => {
    try {
      setLoading(true);

      if (mode === "edit" && articleId) {
        await axiosInstance.patch(`/articles/${articleId}`, data);
      } else {
        await axiosInstance.post("/articles", data);
      }

      form.reset();
      onSuccess?.();
    } catch (err) {
      console.error("Submit failed:", err);
      setFetchError("Submit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || categoriesLoading) {
    return <Skeleton className="w-full h-[200px] rounded-md" />;
  }

  if (fetchError || categoriesError) {
    return (
      <div className="text-red-500 text-sm">
        {fetchError || categoriesError?.message || "Error loading form"}
      </div>
    );
  }

  return (
    <Form {...form}>
     
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <Input {...field} className="w-full" />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Dropdown */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select
                value={field.value || ""}
                onValueChange={field.onChange}
                defaultValue={field.value || undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat.id && cat.id.trim() !== "") // ensures no empty value
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Content</FormLabel>
              <div className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <TiptapEditor value={field.value} onChange={field.onChange} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
