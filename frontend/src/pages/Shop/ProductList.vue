<route lang="yaml">
path: /products
name: products
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ProductItem } from '~/components';
import { useProduct } from '~/stores/product';

const productStore = useProduct();

onMounted(() => {
  productStore.fetchAllProducts();
});

</script>

<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Liste des produits
      </h2>

      <div
        v-if="productStore.products"
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in productStore.products"
          :key="product.id"
          class="group relative"
        >
          <product-item :product="product" />
        </div>
      </div>
      <div v-else>
        Aucun produit
      </div>
    </div>
  </div>
</template>
