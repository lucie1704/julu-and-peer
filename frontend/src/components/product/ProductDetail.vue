<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      class="relative z-10"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>

                <div
                  v-if="product"
                  class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <img
                      :src="product.imageSrc"
                      :alt="product.imageAlt"
                      class="object-cover object-center"
                    >
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ product.name }}
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      class="mt-2"
                    >
                      <h3
                        id="information-heading"
                        class="sr-only"
                      >
                        Product information
                      </h3>

                      <p class="text-2xl text-gray-900">
                        {{ product.price }}
                      </p>

                      <!-- Reviews -->
                      <div class="mt-6">
                        <h4 class="sr-only">
                          Reviews
                        </h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon
                              v-for="index in 5"
                              :key="index"
                              :class="[
                                index <= rating
                                  ? 'text-gray-900'
                                  : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              ]"
                              aria-hidden="true"
                            />
                          </div>
                          <p class="sr-only">
                            {{ rating }} out of 5 stars
                          </p>
                          <a
                            href="#"
                            class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >{{ product.reviewCount }} reviews</a>
                        </div>
                      </div>
                    </section>

                    <section
                      aria-labelledby="options-heading"
                      class="mt-10"
                    >
                      <h3
                        id="options-heading"
                        class="sr-only"
                      >
                        Product options
                      </h3>

                      <form @submit.prevent="submitForm">
                        <div class="text-sm my-4 font-medium text-gray-900">
                          Available: {{ product.availableStock }}
                        </div>
                        <div
                          class="flex flex-1 items-end justify-between text-sm"
                        >
                          <select
                            v-model="quantity"
                            class="m-1 p-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option
                              v-for="n in 10"
                              :key="n"
                              :value="n"
                            >
                              {{ n }}
                            </option>
                          </select>
                        </div>
                        <fieldset
                          class="mt-10"
                          aria-label="Choose a size"
                        >
                          <div class="flex items-center justify-between">
                            <div class="text-sm font-medium text-gray-900">
                              Format
                            </div>
                          </div>

                          <RadioGroup class="mt-4 grid grid-cols-4 gap-4">
                            <RadioGroupOption
                              v-for="format in formats"
                              :key="format.name"
                              v-slot="{ active, checked }"
                              as="template"
                              :value="format"
                              :disabled="!format.inStock"
                            >
                              <div
                                :class="[
                                  format.inStock
                                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                  active ? 'ring-2 ring-indigo-500' : '',
                                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                ]"
                              >
                                <span>{{ format.name }}</span>
                                <span
                                  v-if="format.inStock"
                                  :class="[
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  ]"
                                  aria-hidden="true"
                                />
                                <span
                                  v-else
                                  aria-hidden="true"
                                  class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1="0"
                                      y1="100"
                                      x2="100"
                                      y2="0"
                                      vector-effect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </RadioGroupOption>
                          </RadioGroup>
                        </fieldset>

                        <div class="my-4">
                          Description :
                        </div>
                        <div>{{ product.description }}</div>
                        <button
                          type="submit"
                          class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Ajouter au panier
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
                <div
                  v-else
                  class="flex w-full items-center justify-center"
                >
                  <p>Loading...</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  RadioGroup,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import { StarIcon } from '@heroicons/vue/20/solid';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { CartI, createCartI, ProductI } from '~/dto';

const store = useStore();
const route = useRoute();

// TODO: Get it from product ProductCustomerEvaluations
const rating = 5;
// TODO: Get available format from ProductFormat
const formats = [
  { name: 'Standard', inStock: true },
  { name: 'Deluxe', inStock: false }
];

const customerId = 27;
const product = ref<ProductI | null>(null);
const cart = ref<CartI | null>(null);
const open = ref(true);
const quantity = ref<number>(1);

onMounted(async () => {
  // Get product detail
  await getProductDetail();

  // Get customer cart
  await getCustomerCart(customerId);
});

const getProductDetail = async () => {
  const productId = route.params.id;
  try {
    await store.dispatch('product/getProductById', productId);
    product.value = store.getters['product/product'];
  } catch (error) {
    console.error('Error getting product details:', error);
  }
};
const getCustomerCart = async (customerId: number) => {
  // Get customer cart
  try {
    await store.dispatch('cart/getCartByCustomerId', customerId);
    const customerCart = store.getters['cart/cart'];

    if (customerCart) {
      cart.value = customerCart;
    } else {
      // Create cart if it doesn't exist
      try {
        await store.dispatch('cart/createCart', customerId);
        const newCustomerCart = store.getters['cart/cart'];

        if (newCustomerCart) {
          cart.value = newCustomerCart;
        } else {
          console.error('Failed to create cart');
        }
      } catch (error) {
        console.error('Error creating cart:', error);
      }
    }
  } catch (error) {
    console.error('Error getting customer cart:', error);
  }
};
const submitForm = async () => {
  if (!product.value || !customerId || !cart.value || !quantity.value)
    return console.error('Form validation failed!');

  const productId = product.value.id as string;
  const cartId = cart.value.id as string;

  const data: createCartI = {
    productId,
    cartId,
    quantity: quantity.value
  };

  try {
    await store.dispatch('cart/addToCartItem', data);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
</script>
