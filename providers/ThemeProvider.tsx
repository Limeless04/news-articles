"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useState, useEffect } from "react";

export default function ThemeProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent any rendering until theme has mounted to avoid hydration mismatch
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
