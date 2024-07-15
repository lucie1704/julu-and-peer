import { defineStore } from 'pinia';
import { ref } from 'vue';
import orderAPI from '~/api/order';
import { Order, Orders, PlaceOrder } from '~/dto';

export const useOrder = defineStore('order', () => {
  const orders = ref<Orders | null>();
  const order = ref<Order | null>();
  const message = ref<string | null>(null);
  const orderId = ref<string>();

  const orderConfirm = async (orderId: string) => {
    const jwt_token = '';
    try {
      const response = await orderAPI.orderConfirm(jwt_token, orderId);
      message.value = response;
    } catch (error) {
      console.error('Confirm order fails:', error);
    }
  };

  const placeOrder = async (orderData: PlaceOrder) => {
    const jwt_token = '';
    try {
      const response = await orderAPI.placeOrder(jwt_token, orderData);
      if (response) {
        orderId.value = response.orderId;
        message.value = response.message;
      } else {
        console.error('Error placing order: Received null response');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const fetchOrders = async (payload: {
    jwt_token: string,
    customerId: string,
    status: string
  }) => {
    const jwt_token = '';
    try {
      const response = await orderAPI.getOrders(
        jwt_token,
        payload.customerId,
        payload.status
      );
      orders.value = response;
    } catch (error) {
      console.error(
        `Error getting orders for customer ID ${payload.customerId} with status ${payload.status}:`,
        error
      );
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    const jwt_token = '';
    try {
      const response = await orderAPI.getOrderDetails(jwt_token, orderId);
      order.value = response;
    } catch (error) {
      console.error(`Error getting details for order ID ${orderId}:`, error);
    }
  };

  return {
    orders,
    order,
    message,
    orderId,
    orderConfirm,
    placeOrder,
    fetchOrders,
    fetchOrderDetails
  };
});
