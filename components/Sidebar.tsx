"use client";

import Link from "next/link";
import { FileText, LogOut, Home, X } from "lucide-react";
import { ThemeSwithcer } from "./ThemeSwitcher";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // make sure you have clsx or cn helper
import { ChevronsRight, ChevronsLeft } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onClose: () => void;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}: SidebarProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const menuItems = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Articles", href: "/admin", icon: <FileText size={20} /> },
    {
      label: "Category",
      href: "/admin/categories",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg",
        isCollapsed ? "w-16" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
    >
      {/* Top section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Admin
          </span>
        )}

        {/* Top-right controls (theme + close) */}
        <div
          className={cn("flex items-center", isCollapsed && "flex-col gap-2")}
        >
          <ThemeSwithcer />
          <button
            onClick={onClose}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 text-gray-700 dark:text-gray-300 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout (bottom) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
        {/* Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Toggle sidebar collapse"
        >
          {isCollapsed ? (
            <ChevronsRight size={20} />
          ) : (
            <ChevronsLeft size={20} />
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center text-red-500 hover:text-red-600 transition-colors ${
            isCollapsed ? "justify-center" : "justify-start w-full gap-3"
          }`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
