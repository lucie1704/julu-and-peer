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
    try {
      const response = await orderAPI.orderConfirm(orderId);
      message.value = response;
    } catch (error) {
      message.value = `Échec de la confirmation de la commande : ${error}`;
    }
  };

  const placeOrder = async (orderData: PlaceOrder) => {
    try {
      const response = await orderAPI.placeOrder(orderData);
      if (response) {
        orderId.value = response.orderId;
        message.value = response.message;
      } else {
        message.value = "Erreur lors de la passation de la commande : Réponse nulle reçue";
      }
    } catch (error) {
      message.value = `Erreur lors de la passation de la commande : ${error}`;
    }
  };

  const fetchOrders = async (payload: {
    customerId: string,
    status: string
  }) => {
    try {
      const response = await orderAPI.getOrders(
        payload.customerId,
        payload.status
      );
      orders.value = response;
    } catch (error) {
      message.value = `Erreur lors de la récupération des commandes pour l'ID client ${payload.customerId} avec le statut ${payload.status} : ${error}`;
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await orderAPI.getOrderDetails(orderId);
      order.value = response;
    } catch (error) {
      message.value = `Erreur lors de la récupération des détails pour l'ID de commande ${orderId} : ${error}`;
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
