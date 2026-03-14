import { createContext, useContext, useState, useEffect,type ReactNode } from "react";
import {
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  getCartAPI,
} from "./cart.service";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

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
  const [cart, setCart] = useState<CartItem[]>([]);

  // Safe parser for user from localStorage
  const getUserFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  };

  const user = getUserFromLocalStorage();

  // Fetch cart from backend on mount
  const refreshCart = async () => {
    if (!user?.id) return;
    try {
      const data = await getCartAPI(user.id);
      setCart(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart from backend", err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  // Save cart in localStorage too
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = async (item: CartItem) => {
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

  // Update cart item quantity
  const updateCartItem = async (id: string, quantity: number) => {
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

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    if (user?.id) {
      try {
        await removeCartItemAPI(user.id, Number(id));
      } catch (err) {
        console.error("Failed to remove item from backend cart", err);
      }
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Increase quantity by 1
  const increaseQty = async (id: string) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    await updateCartItem(id, item.quantity + 1);
  };

  // Decrease quantity by 1
  const decreaseQty = async (id: string) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    if (item.quantity > 1) {
      await updateCartItem(id, item.quantity - 1);
    } else {
      await removeFromCart(id);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    // Optionally clear backend cart here if needed
  };

  // Cart totals
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