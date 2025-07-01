// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { FileText, LogOut, Home, X } from "lucide-react";
import { ThemeSwithcer } from "./ThemeSwitcher";
import React from "react"; // Import React for FC type

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform 
                 ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                 md:translate-x-0 
                 transition-transform duration-300 ease-in-out
                 md:static md:shadow-md md:h-full`} 
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-gray-700 dark:text-white">Admin</span>
        <ThemeSwithcer />
        <button
          onClick={onClose}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col space-y-2 p-4 text-gray-600 dark:text-gray-300">
        <Link href="/" className="flex items-center gap-2 hover:text-blue-500" onClick={onClose}>
          <Home size={18} /> Home
        </Link>

        <Link href="/admin" className="flex items-center gap-2 hover:text-blue-500" onClick={onClose}>
          <FileText size={18} /> Articles
        </Link>

        <Link href="/admin/categories" className="flex items-center gap-2 hover:text-blue-500" onClick={onClose}>
          <FileText size={18} /> Category
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 mt-4 text-red-500 hover:text-red-600"
          onClick={onClose}
        >
          <LogOut size={18} /> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;