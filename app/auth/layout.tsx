import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 shadow rounded-lg">{children}</div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
