import { defineStore } from 'pinia';
import { ref } from 'vue';
import productAPI from '~/api/product';
import { PaginatedProducts, Product } from '~/dto';

export const useProduct = defineStore('product', () => {
  const paginatedProducts = ref<PaginatedProducts>();
  const products = ref<Array<Product>>();
  const product = ref<Product>();

  const fetchAllProducts = async(query?: string) => {
    const jwt_token = ''; // Replace with actual logic to get the JWT token

    try {
      paginatedProducts.value = await productAPI.getAllProducts(jwt_token, query);
    } catch {
      console.log('Error fail to fetch product paginated');
    }

    if (paginatedProducts.value) {
      products.value = paginatedProducts.value.data;
    } else {
      console.log('Error fail to fetch products');
    }
  };

  const fetchProductById = async(id: string) => {
    //Get jwt_token from auth module
    const jwt_token = '';
    const fetchedProduct = await productAPI.getProductById(id, jwt_token);

    if (fetchedProduct) {
      product.value = fetchedProduct;

    } else {
      console.log('Error fail to fetch product');
    }
  };

  return {
    paginatedProducts,
    products,
    product,
    fetchAllProducts,
    fetchProductById
  };
});
