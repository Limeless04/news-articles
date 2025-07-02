"use client";

import { Button } from "@/components/ui/button";
import { ArticleFormValues } from "./ArticleForm"; // Make sure this is exported properly
import { Category } from "@/lib/categoryHelper";

interface ArticlePreviewProps {
  data: ArticleFormValues;
  categories: Category[];
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ArticlePreview({
  data,
  categories,
  loading = false,
  onConfirm,
  onCancel,
}: ArticlePreviewProps) {
  const selectedCategory = categories.find((cat) => cat.id === data.categoryId);

  return (
    <div className="space-y-6 border rounded p-4 bg-muted">
      <h2 className="text-xl font-bold">Preview Article</h2>

      <div>
        <p className="text-sm font-medium text-muted-foreground">Title</p>
        <h3 className="text-lg font-semibold">{data.title}</h3>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">Category</p>
        <p>{selectedCategory?.name || "Unknown"}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">Content</p>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Back to Edit
        </Button>
        <Button onClick={onConfirm} disabled={loading}>
          Confirm
        </Button>
      </div>
    </div>
  );
}