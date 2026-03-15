import prisma from "../../lib/prisma.js";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe =
  stripeSecret && stripeSecret.startsWith("sk_")
    ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" })
    : null;

type CreateOrderItemInput = {
  productId: number;
  quantity: number;
  price: number;
};

type CreateOrderInput = {
  userId: number;
  items: CreateOrderItemInput[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  phone: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  paymentReference?: string;
};

const orderInclude = {
  items: {
    include: {
      product: true,
    },
  },
} as const;

export const createOrder = async (input: CreateOrderInput) => {
  const {
    userId,
    items,
    totalAmount,
    customerName,
    customerEmail,
    shippingAddress,
    phone,
    status = "processing",
    paymentStatus = "paid",
    paymentMethod = "mock_card",
    paymentReference,
  } = input;

  if (!items.length) {
    throw new Error("Order must include at least one item");
  }

  const order = await prisma.order.create({
    data: {
      userId,
      customerName,
      customerEmail,
      shippingAddress,
      phone,
      totalAmount,
      status,
      paymentStatus,
      paymentMethod,
      paymentReference,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: orderInclude,
  });

  const productIds = items.map((item) => item.productId);
  const cart = await prisma.cart.findUnique({ where: { userId } });

  if (cart && productIds.length) {
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId: { in: productIds },
      },
    });
  }

  return order;
};

export const getOrderById = async (orderId: number) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: orderInclude,
  });
};

export const getOrdersByUserId = async (userId: number) => {
  return prisma.order.findMany({
    where: { userId },
    include: orderInclude,
    orderBy: { createdAt: "desc" },
  });
};

export const createStripePaymentIntent = async (
  amount: number,
  currency = "usd"
) => {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
  });

  return { clientSecret: intent.client_secret, intentId: intent.id };
};
