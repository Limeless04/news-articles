import { notFound } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { isAxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { filterArticles } from "@/lib/articleHelper";
type Params = Promise<{ id: string }>;

// Use the Article type from hooks/useArticles for compatibility
import type { Article } from "@/hooks/useArticles";

type Props = {
  params: Params;
};

type ArticleApiResponse = {
  data: Article[];
  total: number;
  page: number;
  limit: number;
}

async function getArticleById(id: string): Promise<Article> {
  try {
    const requestUrl = `/articles/${id}`;
    const response = await axiosInstance.get<Article>(requestUrl);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound(); // Trigger Next.js's notFound page for 404 errors
    }
    throw new Error(`Could not retrieve article: ${id}`);
  }
}



async function fetchAllArticles(): Promise<ArticleApiResponse> {
  try {
    const response = await axiosInstance.get<ArticleApiResponse>("/articles");
    return response.data;
  } catch (error) {
     return {
      data: [],
      total: 0,
      page: 1,
      limit: 1,
    };// Return an empty array on error
  }
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);
  const allArticles = await fetchAllArticles();

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600 dark:text-gray-400">
        Article not found.
      </div>
    );
  }


  // 3. Use filterArticles to get related articles from the same category
  //    Exclude the current article itself from the related list
  const relatedArticles = filterArticles({
    articles: Array.isArray(allArticles.data) ? allArticles.data : [],
  })
    .filter((a) => a.id !== article.id) // Exclude the current article
    .slice(0, 3); // Limit to, say, 3 related articles

    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        {" "}
        {/* Increased max-width for dual column */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition mb-8" // Added mb-8 for spacing
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to homepage
        </Link>
        <div className="flex flex-col lg:flex-row gap-8">
          {" "}
          {/* Main layout container */}
          {/* Main Article Section - Adjusted width for left alignment */}
          <div className="flex-grow lg:w-2/3">
            {" "}
            {/* Takes 2/3 width on large screens, grows on small */}
            <Card className="overflow-hidden shadow-lg">
              {article.imageUrl && (
                <div className="relative w-full h-64">
                  <Image
                    src={article.imageUrl || "https://picsum.photos/400/300"}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-md"
                    priority
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-2xl md:text-3xl text-gray-900 dark:text-white">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>By {article.user.username}</span>
                    <span>•</span>
                    <span>
                      {moment(article.createdAt).format("DD MMM YYYY")}
                    </span>{" "}
                    {/* Corrected format for "2025" */}
                    <Badge variant="secondary">{article.category.name}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-8 pt-4">
                <article
                  className="prose max-w-none dark:prose-invert
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-li:text-gray-700 dark:prose-li:text-gray-300
                  prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                  prose-img:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            </Card>
          </div>
          {/* Related Articles Section - Positioned on the right */}
          {relatedArticles.length > 0 && (
            <aside className="lg:w-1/3 flex-shrink-0">
              {" "}
              {/* Takes 1/3 width on large screens, doesn't shrink on small */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:text-left text-center">
                {" "}
                {/* Adjusted heading size and alignment */}
                More from {article.category.name}
              </h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {" "}
                {/* Adjusted grid for sidebar */}
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                  >
                    <Link
                      href={`/articles/${
                        relatedArticle.slug || relatedArticle.id
                      }`}
                    >
                      <Image
                        src={
                          relatedArticle.imageUrl ||
                          "https://picsum.photos/400/300"
                        }
                        alt={relatedArticle.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-900 dark:text-white line-clamp-2">
                          {relatedArticle.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          className="text-muted-foreground text-sm text-gray-600 dark:text-gray-300 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html:
                              relatedArticle.content.substring(0, 150) +
                              (relatedArticle.content.length > 100
                                ? "..."
                                : ""),
                          }}
                        />
                      </CardContent>
                      <CardFooter className="pt-0">
                        <span className="text-primary hover:underline text-sm font-medium text-blue-600 dark:text-blue-400">
                          Read more →
                        </span>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    );
}
