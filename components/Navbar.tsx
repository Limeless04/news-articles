"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Menu,
  Home,
  User,
  LogIn,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeSwithcer } from "./ThemeSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const isOnProfile = pathname === "/profile";
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-[var(--background)] text-[var(--foreground)] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <Link
          href="/"
          className="text-xl font-semibold flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Cyber News</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              {user.role === "Admin" && (
                <Link href="/admin">
                  <Button variant="ghost" className="flex items-center gap-1">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </>
          )}

          {isOnProfile ? (
            <>
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <Button variant="ghost" className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
            </>
          )}

          {user ? (
            <Button onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button>
                <LogIn className="w-4 h-4 mr-1" />
                Login
              </Button>
            </Link>
          )}

          <ThemeSwithcer />
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {user && (
            <>
              {user.role === "Admin" && (
                <Link href="/admin" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </>
          )}

          {isOnProfile ? (
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          ) : (
            <Link href="/profile" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          )}

          {user ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-start">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setIsOpen(false);
            }}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
