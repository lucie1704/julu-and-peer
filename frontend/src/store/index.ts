//@ts-ignore
import { createStore } from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';
import order from './modules/order';
import product from './modules/product';

const store =  createStore({
  modules: {
    auth,
    product,
    cart,
    order
  },
});

export default store;