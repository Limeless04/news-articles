"use client";

import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
          <p className="text-gray-600 dark:text-muted-foreground">Loading...</p>
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background px-4">
          <div className="bg-white dark:bg-card border border-red-200 dark:border-red-400 p-6 rounded-xl shadow-lg max-w-md w-full text-center space-y-3">
            <div className="text-red-500 text-4xl">🚫</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Access Denied
            </h2>
            <p className="text-sm text-gray-600 dark:text-muted-foreground">
              You must be logged in to view this page.
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 dark:bg-background px-4">
        <div className="bg-white dark:bg-card p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            👤 User Profile
          </h1>
          <div className="space-y-2 text-gray-700 dark:text-muted-foreground">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
