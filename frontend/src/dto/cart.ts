import { Product } from './product';

export interface CartProduct {
  cart: Cart;
  totalPrice: number;
  totalDiscount: number;
  cartTotalProductCount: number;
  shippingFee: number;
  outOfStockProducts: number;
  buyProductCartItem: Array<buyProductCartItem>;
}

export interface Cart {
  id?: string;
  customerId?: string;
  createdAt?: string;
  updatedAt?: string;
  CartItems: Array<CartItem>;
}

export interface CartItem {
  id: number;
  productId?: string;
  cartId?: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  Product?: Array<Product>;
}

interface buyProductCartItem {
  id?: string;
  productId?: string;
  cartId?: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  Product: Array<Product>;
}

export interface createCart {
  productId: string;
  cartId: string;
  quantity: number;
}
