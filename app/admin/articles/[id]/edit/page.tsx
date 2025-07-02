"use client";

import ArticleForm from "@/components/admin/ArticleForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import useArticles from "@/hooks/useArticles";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params?.id as string;
  const { refetch } = useArticles();

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        ← Back to Admin
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Edit Article
      </h1>

      <ArticleForm
        mode="edit"
        articleId={articleId}
        onSuccess={() => {
          refetch();
          toast.success("Successfully saved!");
          router.push("/admin");
        }}
      />
    </div>
  );
}
