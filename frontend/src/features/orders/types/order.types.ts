export interface CartProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface CheckoutDraft {
  items: CartProductItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrls: string[];
    category: string;
    description: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  phone: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod?: string | null;
  paymentReference?: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  phone: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentReference?: string;
  status?: string;
}
