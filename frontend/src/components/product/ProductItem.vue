<script lang="ts" setup>
import { onMounted, ref, toRefs } from 'vue';
import { createCart, Product } from '~/dto';
import { useCart } from '~/stores/cart';
import { useCustomer } from '~/stores/customer';
import { useProduct } from '~/stores/product';

const productStore = useProduct();
const cartStore = useCart();
const customerStore = useCustomer();

const props = defineProps<{
  product: Product
}>();

const { product } = toRefs(props);

onMounted(async () => {
  productStore.fetchProductById(product.value._id);
  customerStore.fetchByUserId('3');
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

  const productId = productStore.product._id;
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
    <div
      class="overflow-hidden"
    >
      <!-- @TODO slider pour les images -->
      <v-img
        :aspect-ratio="1"
        :src="product.Image[0].path"
        :alt="product.Image[0].alt"
        class="bg-pink h-full w-full object-center rounded-md"
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
        <v-col class="space-x-3 my-2">
          <v-chip color="orange">
            {{ product.ProductFormat.name }}
          </v-chip>
          <v-chip color="blue">
            {{ product.ProductGenre.name }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="flex justify-end items-center">
          <div class="flex items-center">
            <div :class="product.discount ? 'text-red text-sm flex mr-3' : 'font-bold text-xl' ">
              <h3 :class="product.discount ? 'line-through' : ''">
                {{ product.price }}€
              </h3>
              <p
                v-if="product.discount"
                class="font-bold ml-1"
              >
                -{{ product.discount }}%
              </p>
            </div>
            <h3
              v-if="product.discount"
              class="font-bold text-xl"
            >
              {{ discountedPrice(product.price, product.discount) }}€
            </h3>
          </div>
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
      @click="submitAddItemToCart"
    >
      Ajouter au panier
    </v-btn>
  </div>
</template>