<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import { ref } from 'vue';
import { CartProduct } from '~/dto';

defineProps<{
  cartItems: CartProduct;
}>();

const emit = defineEmits<{
  (e: 'update-quantity', payload: { cartItemId: string, cartItemQuantity: number }): void,
  (e: 'remove-item', payload: { cartItemId: string }): void
}>();

const open = ref(true);

const emitUpdateQuantity = (cartItemId: string, cartItemQuantity: number) => {
  emit('update-quantity', { cartItemId, cartItemQuantity: Number(cartItemQuantity) });
};
const emitRemoveItem = (cartItemId: string) => emit('remove-item', { cartItemId });
</script>

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
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="open = false"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <v-icon icon="fa-solid fa-xmark" />
                        </button>
                      </div>
                    </div>
                    <div class="mt-8">
                      <div class="flow-root">
                        <ul
                          role="list"
                          class="-my-6 divide-y divide-gray-200"
                        >
                          <li
                            v-for="cartProduct in cartItems.availableProducts"
                            :key="cartProduct.id"
                            class="flex py-6"
                          >
                            <router-link
                              class="btn"
                              :to="{
                                name: 'product',
                                params: { id: cartProduct.productId }
                              }"
                            >
                              <div
                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                              >
                                <img
                                  :src="cartProduct.Product.imageSrc"
                                  :alt="cartProduct.Product.imageAlt"
                                  class="h-full w-full object-cover object-center"
                                >
                              </div>
                            </router-link>
                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <a>{{ cartProduct.Product.name }}</a>
                                  </h3>
                                  <p class="ml-4">
                                    {{ cartProduct.Product.price }}
                                  </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                  {{ cartProduct.Product.ProductFormat.name }}
                                </p>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm"
                              >
                                <select
                                  v-model="cartProduct.quantity"
                                  class="m-1 p-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  @change="cartProduct.id && emitUpdateQuantity(cartProduct.id, cartProduct.quantity )"
                                >
                                  <option
                                    v-for="n in 10"
                                    :key="n"
                                    :value="n"
                                  >
                                    {{ n }}
                                  </option>
                                </select>
                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                    @click="cartProduct.id && emitRemoveItem(cartProduct.id)"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="cartItems"
                    class="border-t border-gray-200 px-4 py-6 sm:px-6"
                  >
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Subtotal</p>
                      <p>{{ cartItems.totalPrice }}</p>
                    </div>
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Total Discount</p>
                      <p>{{ cartItems.totalDiscount }}</p>
                    </div>
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>Total Products</p>
                      <p>{{ cartItems.cartTotalProductCount }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <router-link
                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        to="/customer/payment/shipping"
                      >
                        Checkout
                      </router-link>
                    </div>
                    <div
                      class="mt-6 flex justify-center text-center text-sm text-gray-500"
                    >
                      <p>
                        or
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          @click="open = false"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
