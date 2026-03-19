import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";
import {
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  getCartAPI,
} from "./cart.service";
import type { CartProductItem } from "@/features/orders/types/order.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { setPostLoginRedirect } from "@/features/auth/auth.storage";

type CartItem = CartProductItem;

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  const storageKey = useMemo(
    () => (user?.id ? `tastevia_cart_${user.id}` : null),
    [user?.id]
  );

  const refreshCart = async () => {
    if (!user?.id) return;
    try {
      const data = await getCartAPI(user.id);
      const normalizedItems =
        data.items?.map((item: any) => ({
          id: String(item.productId),
          name: item.product.name,
          price: item.product.price,
          image: item.product.imageUrls?.[0] ?? "",
          quantity: item.quantity,
        })) || [];
      setCart(normalizedItems);
    } catch (err) {
      console.error("Failed to fetch cart from backend", err);
    }
  };

  useEffect(() => {
    try {
      if (!storageKey) {
        setCart([]);
        return;
      }
      const raw = localStorage.getItem(storageKey);
      setCart(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    }
  }, [storageKey, user?.id]);

  useEffect(() => {
    if (user?.id) {
      refreshCart();
    }
 
  }, [user?.id]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey]);

  const addToCart = async (item: CartItem) => {
    if (!user?.id) {
      setPostLoginRedirect(window.location.pathname + window.location.search);
      window.alert("Please log in to add items to your cart.");
      window.location.href = "/login";
      return;
    }

    if (user?.id) {
      try {
        await addToCartAPI(user.id, Number(item.id), item.quantity);
      } catch (err) {
        console.error("Failed to add to backend cart", err);
      }
    }

    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };


  const updateCartItem = async (id: string, quantity: number) => {
    if (!user?.id) return;

    if (user?.id) {
      try {
        await updateCartItemAPI(user.id, Number(id), quantity);
      } catch (err) {
        console.error("Failed to update backend cart", err);
      }
    }

    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };


  const removeFromCart = async (id: string) => {
    if (!user?.id) return;

    if (user?.id) {
      try {
        await removeCartItemAPI(user.id, Number(id));
      } catch (err) {
        console.error("Failed to remove item from backend cart", err);
      }
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = async (id: string) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    await updateCartItem(id, item.quantity + 1);
  };


  const decreaseQty = async (id: string) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    if (item.quantity > 1) {
      await updateCartItem(id, item.quantity - 1);
    } else {
      await removeFromCart(id);
    }
  };


  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};