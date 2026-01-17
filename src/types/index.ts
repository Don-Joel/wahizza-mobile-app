// Shopify Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageURL: string | null;
  variants: ProductVariant[];
  category?: string;
  tags?: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  size?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  customizations?: {
    toppings?: string[];
    modifiers?: string[];
    specialInstructions?: string;
  };
}

// Loyalty Types
export interface User {
  id: string;
  email?: string;
  phone?: string;
  pizzaPoints: number;
  totalSpent: number;
  createdAt: Date;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  points: number;
  type: 'earned' | 'redeemed';
  orderId?: string;
  description: string;
  createdAt: Date;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  customerInfo: CustomerInfo;
  createdAt: Date;
  status: OrderStatus;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  imageURL?: string;
  description?: string;
}
