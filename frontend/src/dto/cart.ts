import { ProductI } from './product';

export interface CartProductI {
  cart: CartI
  totalPrice: number
  totalDiscount: number
  cartTotalProductCount: number,
  shippingFee: number
  outOfStockProducts: number
  buyProductCartItem: Array<buyProductCartItemI>
}

export interface CartI {
  id?: string
  customerId?: string
  createdAt?: string
  updatedAt?: string
  CartItems: Array<CartItemI>
}

export interface CartItemI {
  id: number
  productId?: string
  cartId?: string
  quantity: number
  createdAt?: string
  updatedAt?: string
  Product?: Array<ProductI>
}

interface buyProductCartItemI{
  id?: string
  productId?: string
  cartId?: string
  quantity: number
  createdAt?: string
  updatedAt?: string
  Product: Array<ProductI>
}

export interface createCartI {
  productId: string,
  cartId: string,
  quantity: number
}
