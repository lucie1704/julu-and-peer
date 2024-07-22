import axios from 'axios';
import { API_URL } from '~/constants';
import { Order, Orders, PlaceOrder } from '~/dto';
import { headers } from '~/utils/headers';

const ROOT_URL = `${API_URL}/customerorder`;

interface OrderAPI {
  orderConfirm: (orderId: string) => Promise<string | null>;

  placeOrder: (
    data: PlaceOrder
  ) => Promise<{ message: string, orderId: string } | null>;

  getOrders: (
    customerId: string,
    status: string
  ) => Promise<Orders | null>;

  getOrderDetails: (
    orderId: string
  ) => Promise<Order | null>;
}

const createHeaders = (jwt_token: string) => ({
  Authorization: `Bearer ${jwt_token}`,
  'Content-Type': 'application/json'
});

const orderAPI: OrderAPI = {
  async orderConfirm(orderId: string) {
    try {
      const res = await axios.get(`${ROOT_URL}/confirm-order/${orderId}`, {
        headers: headers()
      });
      return res.data;
    } catch (error) {
      return null;
    }
  },
  async placeOrder(data: PlaceOrder) {
    try {
      const res = await axios.post(`${ROOT_URL}/place-order`, data, {
        headers: headers()
      });
      return res.data;
    } catch (error) {
      return null;
    }
  },
  async getOrders(customerId: string, status: string) {
    try {
      const res = await axios.get(
        `${ROOT_URL}/get-orders/${customerId}/${status}`,
        {
          headers: headers()
        }
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },
  async getOrderDetails(orderId: string) {
    try {
      const res = await axios.get(`${ROOT_URL}/get-order-details/${orderId}`, {
        headers:headers()
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }
};

export default orderAPI;
