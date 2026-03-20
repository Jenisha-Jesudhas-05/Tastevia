import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, AuthContextType } from "../types/auth.types";
import {
  clearStoredUser,
  setStoredUser,
} from "../auth.storage";
import { fetchCurrentUser } from "../services/auth.service";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    void init();
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
