import axios from 'axios';
import { API_URL } from '~/constants';
import { Cart, CartItem, CartProduct, createCart } from '~/dto';
import { headers } from '~/utils/headers';

const ROOT_URL = API_URL;

interface CartAPI {
  getCartByCustomerId: ( customerId: string) => Promise<Cart>;

  createCart: (customerId: string) => Promise<Cart>;

  getCartsProducts: (customerId: string) => Promise<CartProduct>;

  addToCartItem: (data: createCart) => Promise<CartItem>;

  cartItemQuantityUpdate: (
    id: string, 
    quantity: number
  ) => Promise<number>;

  deleteCartItem: (id: string) => Promise<string>;

  deleteCart: (id: string) => Promise<string>;
}

const cartAPI: CartAPI = {
  async getCartByCustomerId(customerId: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/carts/customer/${customerId}`,
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async createCart(customerId: string) {
    try {
      const res = await axios.post(
        `${ROOT_URL}/carts`,
        { customerId },
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async getCartsProducts(customerId: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/carts/products/${customerId}`,
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async addToCartItem(data: createCart) {
    try {
      const res = await axios.post(`${ROOT_URL}/cartitem/`, data,
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async cartItemQuantityUpdate(id: string, quantity: number) {
    try {
      const res = await axios.patch(
        `${ROOT_URL}/cartitem/${id}`,
        { quantity },
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async deleteCartItem(id: string) {
    try {
      const res = await axios.delete(`${ROOT_URL}/cartitem/${id}`,
        { headers: headers() }
        );
      return res.data;
    } catch (error) {
      return null;
    }
  },
  async deleteCart(id: string) {
    try {
      const res = await axios.delete(`${ROOT_URL}/carts/${id}`,
        { headers: headers() }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  }
};

export default cartAPI;
