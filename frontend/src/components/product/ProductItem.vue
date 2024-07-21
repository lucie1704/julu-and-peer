<script lang="ts" setup>
import { Product } from '~/dto';

defineProps<{
  product: Product
}>();

const discountedPrice = (price: number, discount: number) => {
  return (price - price * (discount / 100)).toFixed(2);
};
</script>

<template>
  <router-link
    class="btn"
    :to="{ name: 'product', params: { id: product._id } }"
  >
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75"
    >
      <v-img
        :aspect-ratio="1"
        :src="product.imageSrc"
        :alt="product.imageAlt"
        class="bg-pink h-full w-full object-center"
      />
    </div>
    <div class="mt-4">
      <v-row>
        <v-col cols="8">
          <p class="text-lg">
            {{ product.name }}
          </p>
        </v-col>
        <v-col cols="4">
          <div class="flex flex-col text-right">
            <h3
              v-if="product.discount"
              class="font-bold text-xl"
            >
              {{ discountedPrice(product.price, product.discount) }}€
            </h3>
            <div
              :class="product.discount ? 'text-red text-sm flex' : 'font-bold text-xl' "
            >
              <p
                v-if="product.discount"
                class="font-bold mr-1"
              >
                -{{ product.discount }}%
              </p>
              <p :class="product.discount ? 'line-through' : ''">
                {{ product.price }}€
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          {{ product.ProductArtist.name }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          class="space-x-3 my-2"
        >
          <v-chip color="orange">
            {{ product.ProductFormat.name }}
          </v-chip>
          <v-chip color="blue">
            {{ product.ProductGenre.name }}
          </v-chip>
        </v-col>
      </v-row>
    </div>
  </router-link>
  <div class="mt-2 flex justify-center">
    <v-btn
      variant="outlined"
      density="comfortable"
      class="py-5"
      block
    >
      Ajouter au panier
    </v-btn>
  </div>
</template>