import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartProductItem } from "@/features/orders/types/order.types";

type WishlistItem = CartProductItem;

type WishlistContextValue = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "tastevia_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setWishlist(JSON.parse(raw));
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

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
