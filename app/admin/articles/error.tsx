"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error);
  }, [error]);

  const refreshPage = () => {
    router.refresh(); // Next.js router refresh
  };

  const goBack = () => {
    router.back(); // Go back to previous route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
      <div className="flex gap-4">
        <Button onClick={refreshPage}>Refresh Page</Button>
        <Button variant="outline" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
