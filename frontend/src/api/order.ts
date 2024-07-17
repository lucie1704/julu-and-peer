import axios from 'axios';
import { Order, Orders, PlaceOrder } from '~/dto';

const ROOT_URL = 'http://localhost:3000/api/v1/customerorder';

interface OrderAPI {
  orderConfirm: (jwt_token: string, orderId: string) => Promise<string | null>;
  placeOrder: (
    jwt_token: string,
    data: PlaceOrder
  ) => Promise<{ message: string, orderId: string } | null>;
  getOrders: (
    jwt_token: string,
    customerId: string,
    status: string
  ) => Promise<Orders | null>;
  getOrderDetails: (
    jwt_token: string,
    orderId: string
  ) => Promise<Order | null>;
}

const createHeaders = (jwt_token: string) => ({
  Authorization: `Bearer ${jwt_token}`,
  'Content-Type': 'application/json'
});

const orderAPI: OrderAPI = {
  async orderConfirm(jwt_token: string, orderId: string) {
    try {
      const res = await axios.get(`${ROOT_URL}/confirm-order/${orderId}`, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error(`Error confirming order with ID ${orderId}:`, error);
      return null;
    }
  },
  async placeOrder(jwt_token: string, data: PlaceOrder) {
    try {
      const res = await axios.post(`${ROOT_URL}/place-order`, data, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error('Error placing order:', error);
      return null;
    }
  },
  async getOrders(jwt_token: string, customerId: string, status: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/get-orders/${customerId}/${status}`,
        {
          headers: createHeaders(jwt_token)
        }
      );
      return res.data;
    } catch (error) {
      console.error(
        `Error getting orders for customer ID ${customerId} with status ${status}:`,
        error
      );
      return null;
    }
  },
  async getOrderDetails(jwt_token: string, orderId: string) {
    try {
      const res = await axios.get(`${ROOT_URL}/get-order-details/${orderId}`, {
        headers: createHeaders(jwt_token)
      });
      return res.data;
    } catch (error) {
      console.error(`Error getting details for order ID ${orderId}:`, error);
      return null;
    }
  }
};

export default orderAPI;
