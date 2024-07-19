<route lang="yaml">
path: /product/:id
name: product
meta:
  layout: AppLayout
</route>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createCart } from '~/dto';
import { useCart } from '~/stores/cart';
import { useCustomer } from '~/stores/customer';
import { useProduct } from '~/stores/product';

const productStore = useProduct();
const cartStore = useCart();
const customerStore = useCustomer();

const route = useRoute();

const rating = 5;
// TODO: Get available format from ProductFormat

const quantity = ref<number>(1);

onMounted(async () => {
  await getProductDetail();

  await customerStore.fetchByUserId('3');

  if (customerStore.customerId) return await getCustomerCart(customerStore.customerId);
});

const getProductDetail = async () => {
  const productId = route.params.id as string;
  try {
    await productStore.fetchProductById(productId);
  } catch (error) {
    console.error('Error getting product details:', error);
  }
};
const getCustomerCart = async (customerId: string) => {
  // Get customer cart
  try {
    await cartStore.fetchCartByCustomerId(customerId);

    if (!cartStore.cart) {
      // Create cart if it doesn't exist
      try {
        await cartStore.createCart(customerId);
      } catch (error) {
        console.error('Error creating cart:', error);
      }
    }
  } catch (error) {
    console.error('Error getting customer cart:', error);
  }
};

const submitForm = async () => {
  if (!productStore.product
    || !customerStore.customerId
    || !cartStore.cart
    || !quantity.value)
    return console.error('Form validation failed!');

  const productId = productStore.product.id;
  const cartId = cartStore.cart.id as string;

  const data: createCart = {
    productId,
    cartId,
    quantity: quantity.value
  };

  try {
    await cartStore.addCartItem(data);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
</script>

<template>
  <v-card
    v-if="productStore.product"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      height="250"
      :src="productStore.product.imageSrc"
      :alt="productStore.product.imageAlt"
      cover
    />

    <v-card-item>
      <v-card-title>{{ productStore.product.name }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        />

        <div class="text-grey ms-4">
          {{ rating }} / {{ productStore.product.reviewCount }} reviews
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        € {{ productStore.product.price }}
      </div>

      <div>{{ productStore.product.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="blue"
        text="Ajouter au panier"
        block
        @click="submitForm"
      />
    </v-card-actions>
  </v-card>
  <div v-else>
    Pas de produit
  </div>
</template>