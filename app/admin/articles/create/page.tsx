"use client";

import ArticleForm from "@/components/admin/ArticleForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function CreateArticlePage() {
  const router = useRouter();

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        ← Back to Admin
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Create New Article
      </h1>

      <ArticleForm
        mode="create"
        onSuccess={() => {
          toast.success("Successfully saved!");
          router.push("/admin");
        }}
      />
    </div>
  );
}
