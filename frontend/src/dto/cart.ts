import { Product } from './product';

export interface CartProduct {
  cart: Cart;
  totalPrice: number;
  totalDiscount: number;
  cartTotalProductCount: number;
  shippingFee: number;
  outOfStockProducts: number;
  availableProducts: Array<availableProducts>;
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

interface availableProducts {
  id?: string;
  productId?: string;
  cartId?: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  Product: Product;
}

export interface createCart {
  productId: string;
  cartId: string;
  quantity: number;
}
