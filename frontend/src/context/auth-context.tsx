"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, targetRole?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await apiClient.post("/auth/login", { email, password: pass });
      const { access_token, user: userData } = res.data;
      setToken(access_token);
      setUser(userData);
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(err.response?.data?.detail || "Login failed. Please check your credentials.");
      throw err;
    }
  };

  const register = async (name: string, email: string, pass: string, targetRole?: string) => {
    try {
      const res = await apiClient.post("/auth/register", {
        full_name: name,
        email,
        password: pass,
        target_role: targetRole || "Senior Full-Stack Engineer",
      });
      const { access_token, user: userData } = res.data;
      setToken(access_token);
      setUser(userData);
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.detail || "Registration failed. Please check input.");
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
