import axios from 'axios';
import { Cart, CartItem, CartProduct, createCart } from '~/dto';

const ROOT_URL = 'http://localhost:3000/api/v1';

// TODO: get jwt_token directly from store or cookies
interface CartAPI {
  getCartByCustomerId: (
    jwt_token: string,
    customerId: string
  ) => Promise<Cart>;
  createCart: (jwt_token: string, customerId: string) => Promise<Cart>;
  getCartsProducts: (
    jwt_token: string,
    customerId: string
  ) => Promise<CartProduct>;
  addToCartItem: (jwt_token: string, data: createCart) => Promise<CartItem>;
  cartItemQuantityUpdate: (
    jwt_token: string,
    id: string,
    quantity: number
  ) => Promise<number>;
  deleteCartItem: (jwt_token: string, id: string) => Promise<string>;
  deleteCart: (jwt_token: string, id: string) => Promise<string>;
}

const createHeaders = (jwt_token: string) => ({
  Authorization: `Bearer ${jwt_token}`,
  'Content-Type': 'application/json'
});

const cartAPI: CartAPI = {
  async getCartByCustomerId(jwt_token: string, customerId: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/carts/customer/${customerId}`,
        {
          headers: createHeaders(jwt_token)
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error: Failed to get cart.', error);
      return null;
    }
  },

  async createCart(jwt_token: string, customerId: string) {
    try {
      const res = await axios.post(
        `${ROOT_URL}/carts`,
        { customerId },
        {
          headers: createHeaders(jwt_token)
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error: Failed to create cart.', error);
      return null;
    }
  },

  async getCartsProducts(jwt_token: string, customerId: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/carts/products/${customerId}`,
        {
          headers: createHeaders(jwt_token)
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error: Failed to get cart products.', error);
      return null;
    }
  },

  async addToCartItem(jwt_token: string, data: createCart) {
    try {
      const res = await axios.post(`${ROOT_URL}/cartitem/`, data, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error('Error: Failed to add product to cart item.', error);
      return null;
    }
  },

  async cartItemQuantityUpdate(
    jwt_token: string,
    id: string,
    quantity: number
  ) {
    try {
      const res = await axios.patch(
        `${ROOT_URL}/cartitem/${id}`,
        { quantity },
        {
          headers: createHeaders(jwt_token)
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error: Failed to increase cart item quantity.', error);
      return null;
    }
  },

  async deleteCartItem(jwt_token: string, id: string) {
    try {
      const res = await axios.delete(`${ROOT_URL}/cartitem/${id}`, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error('Error: Failed to delete cart item.', error);
      return null;
    }
  },
  async deleteCart(jwt_token: string, id: string) {
    try {
      const res = await axios.delete(`${ROOT_URL}/carts/${id}`, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error('Error: Failed to delete cart.', error);
      return null;
    }
  }
};

export default cartAPI;
