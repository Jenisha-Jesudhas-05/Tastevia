import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartProductItem } from "@/features/orders/types/order.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

type WishlistItem = CartProductItem;

type WishlistContextValue = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY_PREFIX = "tastevia_wishlist";
const GUEST_KEY = `${STORAGE_KEY_PREFIX}_guest`;
const LEGACY_KEY = STORAGE_KEY_PREFIX; // backward compatibility

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const key = `${STORAGE_KEY_PREFIX}_${user?.id ?? "guest"}`;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage on init", error);
      return [];
    }
  });

  const storageKey = useMemo(
    () => `${STORAGE_KEY_PREFIX}_${user?.id ?? "guest"}`,
    [user?.id]
  );

  useEffect(() => {
    try {
      // migrate any guest wishlist to the logged-in user on first load
      if (user?.id) {
        const guestRaw = localStorage.getItem(GUEST_KEY);
        const userRaw = localStorage.getItem(storageKey);
        if (!userRaw && guestRaw) {
          localStorage.setItem(storageKey, guestRaw);
          localStorage.removeItem(GUEST_KEY);
        }
      }

      // migrate legacy key (pre-user-scoped) once
      const legacyRaw = localStorage.getItem(LEGACY_KEY);
      if (legacyRaw && !localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, legacyRaw);
        localStorage.removeItem(LEGACY_KEY);
      }

      const raw = localStorage.getItem(storageKey);
      setWishlist(raw ? JSON.parse(raw) : []);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((current) => {
      if (current.some((i) => i.id === item.id)) return current;
      return [...current, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((current) => current.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isSaved: (id: string) => wishlist.some((item) => item.id === id),
    }),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
