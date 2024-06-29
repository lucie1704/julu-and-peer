import { defineStore } from 'pinia';
import { ref } from 'vue';
import productAPI from '~/api/product';
import { ProductI } from '~/dto';

export const useProduct = defineStore('product', () => {
  const products = ref<Array<ProductI>>();
  const product = ref<ProductI>();

  const fetchAllProducts = async() => {
    //Get jwt_token from auth module
    const jwt_token = '';
    const response = await productAPI.getAllProducts(jwt_token);

    if (products.value) {
      products.value = response;
    } else {
      console.log('Error fail to fetch products');
    }
  };

  const fetchProductById = async(id: string) => {
    //Get jwt_token from auth module
    const jwt_token = '';
    const response = await productAPI.getProductById(id, jwt_token);

    if (product.value) {
      product.value = response;

    } else {
      console.log('Error fail to fetch product');
    }
  };

  return {
    products,
    product,
    fetchAllProducts,
    fetchProductById
  };
});
