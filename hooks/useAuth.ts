"use client";

import { useState, useEffect } from "react";
import { AuthService } from "@/lib/authService";

interface User {
  id: string;
  username: string;
  role: "User" | "Admin";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    AuthService.getProfile()
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await AuthService.login({ username, password });
     localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setIsAuthenticated(true);
    return res;
  };

  const register = async (username: string, password: string, role: "User" | "Admin") => {
    const res = await AuthService.register({ username, password, role });
    setUser(res.data.user);
    setIsAuthenticated(true);
    return res;
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
