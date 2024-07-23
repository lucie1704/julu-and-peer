import { defineStore } from 'pinia';
import { ref } from 'vue';
import productAPI from '~/api/product';
import { PaginatedProducts, Product } from '~/dto';

export const useProduct = defineStore('product', () => {
  const paginatedProducts = ref<PaginatedProducts>();
  const products = ref<Array<Product>>();
  const product = ref<Product>();
  const message = ref<string | null>(null);

  const fetchAllProducts = async(query?: string) => {
    try {
      paginatedProducts.value = await productAPI.getAllProducts(query);
    } catch (error) {
      message.value = `Erreur lors de la récupération des produits paginés: ${error}`;
    }

    if (paginatedProducts.value) {
      products.value = paginatedProducts.value.data;
    } else {
      message.value = 'Erreur lors de la récupération des produits';
    }
  };

  const fetchProductById = async(id: string) => {
    try {
      const fetchedProduct = await productAPI.getProductById(id);
      if (fetchedProduct) {
        product.value = fetchedProduct;
      } else {
        product.value = undefined;
        message.value = 'Produit non trouvé';
      }
    } catch (error) {
      message.value = `Erreur lors de la récupération du produit avec l'ID ${id}: ${error}`;
    }
  };

  return {
    paginatedProducts,
    products,
    product,
    fetchAllProducts,
    fetchProductById,
    message
  };
});
