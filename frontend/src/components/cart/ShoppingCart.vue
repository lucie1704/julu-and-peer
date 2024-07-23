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
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none"
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
              <DialogPanel class="w-screen max-w-md pointer-events-auto">
                <div
                  class="flex flex-col h-full overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div class="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          class="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
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
                                name: 'home',
                                params: { id: cartProduct.productId }
                              }"
                            >
                              <div
                                class="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md"
                              >
                                <img
                                  :src="cartProduct.Product.Images[0].path"
                                  :alt="cartProduct.Product.Images[0].alt"
                                  class="object-cover object-center w-full h-full"
                                >
                              </div>
                            </router-link>
                            <div class="flex flex-col flex-1 ml-4">
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
                                class="flex items-end justify-between flex-1 text-sm"
                              >
                                <select
                                  v-model="cartProduct.quantity"
                                  class="block p-1 m-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    class="px-4 py-6 border-t border-gray-200 sm:px-6"
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
                        class="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        to="/customer/payment/shipping"
                      >
                        Checkout
                      </router-link>
                    </div>
                    <div
                      class="flex justify-center mt-6 text-sm text-center text-gray-500"
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
