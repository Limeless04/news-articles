// app/admin/layout.tsx
"use client"

import Sidebar from "@/components/Sidebar";
import { ReactNode,  useState } from "react";
import {Menu} from "lucide-react"
import { Button } from "@/components/ui/button";


export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

      const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  return (
     <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Admin</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
       <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>

      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
