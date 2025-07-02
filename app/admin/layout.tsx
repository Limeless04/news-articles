// app/admin/layout.tsx
"use client"

import Sidebar from "@/components/Sidebar";
import { ReactNode,  useState } from "react";
import {Menu} from "lucide-react"
import { Button } from "@/components/ui/button";
import { ModalProvider } from "@/providers/ModalProvider";
import CategoryModal from "@/components/admin/CategoryModal";
import { ProtectedAdmin } from "@/components/admin/ProtectedWrapper";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // desktop collapse

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <ProtectedAdmin>
        <ModalProvider>
          {/* Mobile Toggle */}
          <div className="md:hidden flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-lg font-semibold text-gray-700 dark:text-white">
              Admin
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu />
            </Button>
          </div>

          <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
            <Sidebar
              isOpen={isSidebarOpen}
              isCollapsed={isSidebarCollapsed}
              onClose={closeSidebar}
              onToggleCollapse={toggleCollapse} // ✅ pass this
            />
          </div>

          {/* Collapse Button (Desktop Only) */}
          {/* <div className="hidden md:flex flex-col items-center justify-start pt-4 bg-white dark:bg-gray-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="text-muted-foreground"
            >
              {isSidebarCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
            </Button>
          </div> */}

          <main className="flex-1 overflow-y-auto p-6">{children}</main>

          <CategoryModal />
        </ModalProvider>
      </ProtectedAdmin>
    </div>
  );
}
