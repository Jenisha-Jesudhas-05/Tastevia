import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth.types";
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  getStoredUser,
  setStoredUser,
} from "../auth.storage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = getStoredUser();
    const token = getStoredToken();

    if (storedUser && token) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // Login
  const loginUser = (user: User) => {
    setStoredUser(user);
    setUser(user);
  };

  // Logout
  const logoutUser = () => {
    clearStoredToken();
    clearStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), loginUser, logoutUser }}
    >
      {!loading && children} {/* Avoid flash */}
    </AuthContext.Provider>
  );
};
