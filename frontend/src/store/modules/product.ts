//@ts-ignore
import { ActionTree, Commit, GetterTree, Module, MutationTree } from 'vuex';
import productAPI from '../../api/product';
import { ProductI } from '../../dto/product';

interface State {
  products?: Array<ProductI>;
  product?: ProductI;
}

const state: State = {
  products: undefined,
  product: undefined,
};

const getters: GetterTree<State, any> = {
  products:  (state: State) => state.products,
  product:  (state: State) => state.product,
};

const actions: ActionTree<State, any> = {
  async getAllProducts({ commit }: { commit: Commit<State> }) {

    //Get jwt_token from auth module
    const jwt_tokent = '';
    const products = await productAPI.getAllProducts(jwt_tokent);

    if (products) {
      commit('setProducts', products);
  
    }
 else {
      console.log('Error fail to fetch products');
    }

  },
  async getProductById({ commit }: { commit: Commit<State>}, id: string) {

    //Get jwt_token from auth module
    const jwt_tokent = '';
    const product = await productAPI.getProductById(id, jwt_tokent);

    if (product) {
      commit('setProduct', product);
  
    }
 else {
      console.log('Error fail to fetch product');
    }

  },

};

const mutations: MutationTree<State> = {
  setProducts: (state : State, products: Array<ProductI>) => {
    state.products = products;
  },
  setProduct: (state: State, product: ProductI) => {
    state.product = product;
  }
};

const product: Module<State, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default product;
