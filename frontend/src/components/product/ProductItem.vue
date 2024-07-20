<script lang="ts" setup>
import { computed } from 'vue';
import { Product } from '~/dto';

defineProps<{
  product: Product
}>();

const discountedPrice = (price: number, discount: number) => {
  return (price - price * (discount / 100)).toFixed(2);
};

const truncateDescription = (description: string) => {
  return computed(() => {
    return description.length > 50
      ? description.slice(0, 50) + '...'
      : description;
  });
};
</script>

<template>
  <router-link
    class="btn"
    :to="{ name: 'product', params: { id: product.id } }"
  >
    <div
      class="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80"
    >
      <img
        :src="product.imageSrc"
        :alt="product.imageAlt"
        class="object-cover object-center w-full h-full lg:h-full lg:w-full"
      >
    </div>
    <div class="flex justify-between mt-4">
      <div>
        <h3 class="text-sm text-gray-700">
          <a>
            <span
              aria-hidden="true"
              class="absolute inset-0"
            />
            {{ product.name }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ product.ProductArtist.name }} -
          {{ product.ProductFormat.name }} -
          {{ product.ProductGenre.name }}
        </p>
        <div class="flex items-center">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927C9.198 2.579 9.524 2.334 9.9 2.334s.701.245.851.593l1.054 2.131 2.364.344c.378.055.701.33.817.707.116.376.015.798-.25 1.082l-1.711 1.667.404 2.357c.068.397-.09.797-.395 1.036a1.046 1.046 0 01-1.086.104l-2.12-1.113-2.12 1.113a1.046 1.046 0 01-1.086-.104c-.305-.239-.463-.639-.395-1.036l.404-2.357-1.711-1.667c-.265-.284-.366-.706-.25-1.082.116-.377.439-.652.817-.707l2.364-.344 1.054-2.131z"
            />
          </svg>
        </div>
        <p class="mt-1 text-sm text-gray-500">
          {{ truncateDescription(product.description) }}
        </p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900">
          <span
            v-if="product.discount > 0"
            class="mr-2 text-gray-500 line-through"
          >
            {{ product.price }}
          </span>
          <span>{{ discountedPrice(product.price, product.discount) }}</span>
        </p>
      </div>
    </div>
  </router-link>
  <div class="flex justify-center mt-2">
    <button
      class="flex items-center justify-center w-full px-4 py-2 mt-2 text-base font-medium text-black bg-gray-200 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Ajouter au panier
    </button>
  </div>
</template>