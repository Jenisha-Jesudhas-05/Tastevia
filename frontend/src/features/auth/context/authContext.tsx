import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 🔹 track if loading user from storage

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login
  const loginUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {/* Only render children when loading is done to avoid flash */}
      {!loading && children}
    </AuthContext.Provider>
  );
};