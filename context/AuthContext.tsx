"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import storageService from "@/src/util/storageService";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (tokens: { access: string; refresh: string; user?: any }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      console.log("storedUser", storedUser);
      if (storedUser) {
        try {
          setUser(storedUser ? JSON.parse(storedUser) : null);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (body: any): Promise<boolean> => {
    try {
      // Simulate API call - Replace with your actual authentication

      setUser(body);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(body));
      }
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
