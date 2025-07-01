"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export default function CardLoading() {
  return (
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow w-[400px] h-full animate-pulse">
      {/* Image Placeholder */}
      <div className=" w-full h-50 px-10 bg-gray-300 dark:bg-gray-700 " />

      {/* Header Placeholder */}
      <CardHeader>
        <div className="h-5 bg-gray-300 dark:bg-gray-600 w-3/4 rounded" />
      </CardHeader>

      {/* Content Placeholder */}
      <CardContent className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 w-full rounded" />
        <div className="h-3 bg-gray-300 dark:bg-gray-600 w-5/6 rounded" />
      </CardContent>

      {/* Footer Placeholder */}
      <CardFooter>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2 rounded" />
      </CardFooter>
    </Card>
  );
}
