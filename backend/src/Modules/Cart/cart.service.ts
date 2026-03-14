import prisma from "../../lib/prisma";

// Add item to cart
export const addToCart = async (userId: number, productId: number, quantity: number) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existing = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity }
  });
};

// Get cart for a user
export const getCart = async (userId: number) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } }
    }
  });
};

// Update quantity of a cart item
export const updateCartItem = async (userId: number, productId: number, quantity: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");

  const item = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId }
  });
  if (!item) throw new Error("Cart item not found");

  await prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity }
  });

  return getCart(userId);
};

export const removeCartItem = async (userId: number, productId: number) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found");

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId }
  });

  return getCart(userId);
};