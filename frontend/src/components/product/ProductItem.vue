<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue';
import { createCart, Product } from '~/dto';
import { useCart } from '~/stores/cart';
import { useCustomer } from '~/stores/customer';
import { useProduct } from '~/stores/product';
import { getUserId } from '~/utils/authUtils';

const productStore = useProduct();
const cartStore = useCart();
const customerStore = useCustomer();

const props = defineProps<{
  product: Product
}>();

const { product } = toRefs(props);

onMounted(async () => {
  productStore.fetchProductById(product.value._id);
  await customerStore.fetchByUserId(getUserId());

  if (customerStore.customerId) {
    try {
      await cartStore.fetchCartByCustomerId(customerStore.customerId);

      if (!cartStore.cart) {
        try {
          await cartStore.createCart(customerStore.customerId);
        } catch (error) {
          console.error('Error creating cart:', error);
        }
      }
    } catch (error) {
      console.error('Error getting customer cart:', error);
    }
  }
});

const discountedPrice = (price: number, discount: number) => {
  return (price - price * (discount / 100)).toFixed(2);
};

const quantity = ref<number>(1);

const submitAddItemToCart = async () => {
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
  <router-link
    class="btn"
    :to="{ name: 'product', params: { id: product._id } }"
  >
    <div class="overflow-hidden">
      <v-img
        :aspect-ratio="1"
        :src="product.Images?.[0]?.path ?? '#'"
        :alt="product.Images?.[0]?.alt ?? ''"
        class="object-center w-full h-full rounded-md bg-pink"
      />
    </div>
    <div class="mt-4">
      <v-row>
        <v-col>
          <p class="text-lg">
            {{ product.name }}
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          {{ product.ProductArtist.name }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="my-2 space-x-3">
          <v-chip color="orange">
            {{ product.ProductFormat.name }}
          </v-chip>
          <v-chip color="blue">
            {{ product.ProductGenre.name }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="flex items-center justify-end">
          <div class="flex items-center">
            <div :class="product.discount ? 'text-red text-sm flex mr-3' : 'font-bold text-xl' ">
              <h3 :class="product.discount ? 'line-through' : ''">
                {{ product.price }}€
              </h3>
              <p
                v-if="product.discount"
                class="ml-1 font-bold"
              >
                -{{ product.discount }}%
              </p>
            </div>
            <h3
              v-if="product.discount"
              class="text-xl font-bold"
            >
              {{ discountedPrice(product.price, product.discount) }}€
            </h3>
          </div>
        </v-col>
      </v-row>
    </div>
  </router-link>
  <div class="flex justify-center mt-2">
    <v-btn
      variant="outlined"
      density="comfortable"
      class="py-5"
      block
      @click="submitAddItemToCart"
    >
      Ajouter au panier
    </v-btn>
  </div>
</template>