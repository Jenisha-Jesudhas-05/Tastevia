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
import { setPostLoginRedirect } from "@/features/auth/auth.storage";

type WishlistItem = CartProductItem;

type WishlistContextValue = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY_PREFIX = "tastevia_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const storageKey = useMemo(
    () => (user?.id ? `${STORAGE_KEY_PREFIX}_${user.id}` : null),
    [user?.id]
  );

  useEffect(() => {
    try {
      if (!storageKey) {
        setWishlist([]);
        return;
      }
      const raw = localStorage.getItem(storageKey);
      setWishlist(raw ? JSON.parse(raw) : []);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, storageKey]);

  const addToWishlist = (item: WishlistItem) => {
    if (!user?.id) {
      setPostLoginRedirect(window.location.pathname + window.location.search);
      window.alert("Please log in to save items to wishlist.");
      window.location.href = "/login";
      return;
    }

    setWishlist((current) => {
      if (current.some((i) => i.id === item.id)) return current;
      return [...current, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    if (!user?.id) return;

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
