import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth.types";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../auth.storage";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const loginUser = (user: User) => {
    setStoredUser(user);
    setUser(user);
  };

  const logoutUser = () => {
    clearStoredUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), loginUser, logoutUser }}
    >
      {!loading && children} 
    </AuthContext.Provider>
  );
};
