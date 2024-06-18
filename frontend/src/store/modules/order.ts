import { OrderI, PlaceOrderI } from './../../dto/order';
//@ts-ignore
import { ActionTree, Commit, GetterTree, Module, MutationTree } from 'vuex';
import orderAPI from '../../api/order';

interface State {
  orders?: Array<OrderI>
  order?: OrderI
  message?: string;
  orderId?: string
}

const state: State = {
  orders: undefined,
  order: undefined,
  message: "",
  orderId: "",
};

const getters: GetterTree<State, any> = {
  orders: (state: State) => state.orders,
  order: (state: State) => state.order,
  message:(state: State) => state.message,
  orderI:(state: State) => state.order,

};

const actions: ActionTree<State, any> = {

  async orderConfirm({ commit }: { commit: Commit }, orderId: string) {
    const jwt_token = "";
    try {
      const message = await orderAPI.orderConfirm(jwt_token, orderId);
      commit('setMessage', message);
    } catch (error) {
      console.error("Confirm  order fails:", error);
    }
  },
  async placeOrder({ commit }: { commit: Commit }, orderData: PlaceOrderI) {
    const jwt_token = "";
    try {
      const response = await orderAPI.placeOrder(jwt_token, orderData);
      if (response) {
        commit('setOrderId', response.orderId);
        commit('setMessage', response.message);
      } else {
        console.error("Error placing order: Received null response");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  },
  async getOrders({ commit }: { commit: Commit }, payload: { jwt_token: string, customerId: string, status: string }) {
    const jwt_token = "";
    try {
      const orders = await orderAPI.getOrders(jwt_token, payload.customerId, payload.status);
      commit('setOrders', orders);
    } catch (error) {
      console.error(`Error getting orders for customer ID ${payload.customerId} with status ${payload.status}:`, error);
    }
  },

  async getOrderDetails({ commit }: { commit: Commit },orderId: string ) {
    const jwt_token = "";
    try {
      const order = await orderAPI.getOrderDetails(jwt_token, orderId);
      commit('setOrder', order);
    } catch (error) {
      console.error(`Error getting details for order ID ${orderId}:`, error);
    }
  },

};

const mutations: MutationTree<State> = {
  
  setOrders: (state: State, orders: Array<OrderI>) => {
    state.orders = orders;
  },

  setOrder: (state: State, order: OrderI) => {
    state.order = order;
  },

  setOrderId: (state: State, orderId: string) => {
    state.orderId = orderId;
  },

  setMessage: (state: State, message: string) => {
    state.message = message;
  },
};

const order: Module<State, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default order;
