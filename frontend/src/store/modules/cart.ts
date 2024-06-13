//@ts-ignore
import { ActionTree, Commit, GetterTree, Module, MutationTree } from 'vuex';
import cartAPI from '../../api/cart';
import { CartI, CartItemI, CartProductI, createCartI } from '../../dto/cart';
import router from '../../routes/router';

interface State {
  cart?: CartI;
  cartProducts?: CartProductI;
  cartItem?: CartItemI;
  quantity?: number;
  message?: string;
}

const state: State = {
  cart: undefined,
  cartProducts: undefined,
  cartItem: undefined,
  quantity: 0,
  message: "",
};

const getters: GetterTree<State, any> = {
  cartProducts: (state: State) => state.cartProducts,
  cartItem: (state: State) => state.cartItem,
  cart: (state: State) => state.cart,
};

const actions: ActionTree<State, any> = {
  async getCartByCustomerId({ commit }: { commit: Commit }, customerId: string) {
    const jwt_token = "";
    try {
      const cart = await cartAPI.getCartByCustomerId(jwt_token, customerId);
      commit('setCart', cart);
    } catch (error) {
      console.error("Cart no found :", error);
    }
  },
  async createCart({ commit }: { commit: Commit }, customerId: string) {
    const jwt_token = ""; 
    try {
      const cart = await cartAPI.createCart(jwt_token, customerId);
      commit('setCart', cart);
    } catch (error) {
      console.error("Failed to create cart :", error);
    }
  },
  
  async addToCartItem({ commit }: { commit: Commit }, data: createCartI) {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = ""; 
    try {
      const cartItem = await cartAPI.addToCartItem(jwt_token, data);
      commit('setCartItem', cartItem);

      router.push('/customer/shopping-carts');
    } catch (error) {
      console.error("Failed to add CartItem:", error);
    }
  },
  async getCartsProducts({ commit }: { commit: Commit }, customerId: string) {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = ""; 
    try {
      const cartProducts = await cartAPI.getCartsProducts(jwt_token, customerId);
      commit('setCartProduct', cartProducts);
    } catch (error) {
      console.error("Failed to fetch cart Products:", error);
    }
  },
  
  async cartItemQuantityUpdate({ commit }: { commit: Commit }, payload : {cartItemId: string, newQuantity: number}) {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = ""; 
    try {
      const newQuantity = await cartAPI.cartItemQuantityUpdate(jwt_token, payload.cartItemId, payload.newQuantity);
      commit('setQuantity', newQuantity);
    } catch (error) {
      console.error("Failed to update cartItem quantity:", error);
    }
  },

  async deleteCartItem({ commit }: { commit: Commit }, id: string) {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = ""; 
    try {
      const message = await cartAPI.deleteCartItem(jwt_token, id);
      commit('setMessage', message);
    } catch (error) {
      console.error("Failed to delete CartItem:", error);
    }
  },
  async deleteCart({ commit }: { commit: Commit }, id: string) {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = ""; 
    try {
      const message = await cartAPI.deleteCart(jwt_token, id);
      commit('setCartProduct', {});
      commit('setMessage', message);
    } catch (error) {
      console.error("Failed to delete Cart:", error);
    }
  },
};
const mutations: MutationTree<State> = {
  setCart: (state: State, cart: CartI) => {
    state.cart = cart;
  },
  setCartProduct: (state: State, cartProducts: CartProductI) => {
    state.cartProducts = cartProducts;
  },
  setCartItem: (state: State, cartItem: CartItemI) => {
    state.cartItem = cartItem;
  },
  setQuantity: (state: State, quantity: number) => {
    state.quantity = quantity;
  },
  setMessage: (state: State, message: string) => {
    state.message = message;
  },
};

const cart: Module<State, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default cart;
