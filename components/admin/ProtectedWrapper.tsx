"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "Admin") {
        router.push("/");
      }
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LineSpinner size="40" stroke="3" speed="1" />
      </div>
    );
  }

  return <>{children}</>;
}
