import ArticleTable from "@/components/ArticleTable";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Manage Articlese
      </h1>
      <ArticleTable />
    </div>
  );
}
