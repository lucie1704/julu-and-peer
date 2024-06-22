<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
        @submit.prevent="submitForm"
      >
        <div class="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Contact Information
            </h2>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
          </div>

          <h2 class="text-xl font-bold">
            Shipping Information
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700"
              >First name</label>
              <input
                id="first-name"
                v-model="shippingInfo.firstName"
                type="text"
                name="first-name"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-medium text-gray-700"
              >Last name</label>
              <input
                id="last-name"
                v-model="shippingInfo.lastName"
                type="text"
                name="last-name"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="company"
                class="block text-sm font-medium text-gray-700"
              >Company</label>
              <input
                id="company"
                v-model="shippingInfo.company"
                type="text"
                name="company"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
              >Address</label>
              <input
                id="address"
                v-model="shippingInfo.address"
                type="text"
                name="address"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="apartment"
                class="block text-sm font-medium text-gray-700"
              >Apartment, suite, etc.</label>
              <input
                id="apartment"
                v-model="shippingInfo.apartment"
                type="text"
                name="apartment"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label
                for="city"
                class="block text-sm font-medium text-gray-700"
              >City</label>
              <input
                id="city"
                v-model="shippingInfo.city"
                type="text"
                name="city"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >Country</label>
              <select
                id="country"
                v-model="shippingInfo.country"
                name="country"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>United States</option>
              </select>
            </div>
            <div>
              <label
                for="state"
                class="block text-sm font-medium text-gray-700"
              >State / Province</label>
              <input
                id="state"
                v-model="shippingInfo.state"
                type="text"
                name="state"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div>
              <label
                for="postal-code"
                class="block text-sm font-medium text-gray-700"
              >Postal code</label>
              <input
                id="postal-code"
                v-model="shippingInfo.postalCode"
                type="text"
                name="postal-code"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700"
              >Phone</label>
              <input
                id="phone"
                v-model="shippingInfo.phone"
                type="text"
                name="phone"
                class="m-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md space-y-6 flex flex-col">
          <h2 class="text-xl font-bold">
            Order summary
          </h2>
          <ul
            role="list"
            class="-my-6 divide-y divide-gray-200"
          >
            <li
              v-for="cartItem in cartsProducts?.cart?.CartItems"
              :key="cartItem.id"
              class="flex py-6"
            >
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  :src="cartItem?.Product?.imageSrc"
                  :alt="cartItem?.Product?.imageAlt"
                  class="h-full w-full object-cover object-center"
                >
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a>{{ cartItem?.Product?.name }}</a>
                    </h3>
                    <p class="ml-4">
                      {{ cartItem?.Product?.price }}$
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ cartItem?.Product?.ProductFormat?.name }}
                  </p>
                </div>

                <div class="flex flex-1 items-end justify-between text-sm">
                  <select
                    v-model="cartItem.quantity"
                    class="m-1 p-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    @change="updateQuantity(cartItem.id, cartItem.quantity)"
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
                      @click="removeItem(cartItem.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div
            v-if="cartsProducts"
            class="mt-6 border-t border-gray-200 pt-4"
          >
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{{ cartsProducts?.totalPrice }}</p>
            </div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Total Discount</p>
              <p>{{ cartsProducts?.totalDiscount }}</p>
            </div>
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Total Products</p>
              <p>{{ cartsProducts?.cartTotalProductCount }}</p>
            </div>
            <div class="flex justify-between text-sm font-medium text-gray-900 mt-4">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div class="border-t border-gray-200 mt-4" />
            <div class="flex justify-between text-sm font-medium text-gray-900 mt-4">
              <p>Total</p>
              <p>
                {{ calculateTotal(
                  cartsProducts?.totalPrice,
                  cartsProducts?.totalDiscount,
                  cartsProducts?.shipping || 10
                ) }}
              </p>
            </div>
          </div>
          <button class="w-full bg-indigo-600 text-white rounded-md py-2 mt-4 hover:bg-indigo-700">
            Confirm order
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
// @ts-ignore
import { useStore } from 'vuex';
import { CartProductI } from '../../dto/cart';
import { OrderProductI, PlaceOrderI } from '../../dto/order';
import router from '../../routes/router';

const store = useStore();

const cartsProducts = ref<CartProductI | null>(null);
const email = ref('');
const shippingInfo = ref({
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  apartment: '',
  city: '',
  country: 'France',
  state: '',
  postalCode: '',
  phone: ''
});

const fetchCartProducts = async (customerId: number) => {
  try {
    await store.dispatch('cart/getCartsProducts', customerId);
    const customerCartsProducts = store.getters['cart/cartProducts'];
    if (customerCartsProducts) {
      cartsProducts.value = customerCartsProducts;
    }
  }
 catch (error) {
    console.error('Error getting customer cart item product:', error);
  }
};

onMounted(() => {
  const customerId = 27;
  fetchCartProducts(customerId);
});

const removeItem = async (cartItemId: number) => {
  try {
    await store.dispatch('cart/deleteCartItem', cartItemId);
    const customerId = 27;
    await fetchCartProducts(customerId);
  }
 catch (error) {
    console.error('Error removing cart item:', error);
  }
};

const updateQuantity = async (cartItemId: number, newQuantity: number) => {
  try {
    await store.dispatch('cart/cartItemQuantityUpdate', { cartItemId, newQuantity });
    const customerId = 27;
    await fetchCartProducts(customerId);
  }
 catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

const calculateTotal = (totalPrice: number, totalDiscount: number, shippingFee: number) => {
  return computed(() => {
    return totalPrice + shippingFee - totalDiscount;
  });
};

const submitForm = async () => {

  //TODO: Implémenter le paiement
  if (!email.value || !shippingInfo.value || !cartsProducts.value) return  console.error('Form validation failed!');

    const orderData : PlaceOrderI = {
        shippingFee: 20.0,
        products: cartsProducts.value.buyProductCartItem.map(cartItem => ({
            id: cartItem.Product?.id,
            name: cartItem.Product?.name,
            description: cartItem.Product?.description,
            price: parseFloat(cartItem.Product?.price).toFixed(1),
            quantity: 2
        })),
        shippingInfo: shippingInfo.value,
        email: 'justin@gmail.com',
        customerId: 27
      };

  try {
    await store.dispatch('order/placeOrder', orderData);
    //TODO: DELETE CART
    await store.dispatch('cart/deleteCart', cartsProducts.value?.cart.id);

    router.push('/');
      // @ts-ignore
      cartsProducts.value = {};
  }
 catch (error) {
    console.error('Error to confirm order : ', error);
  }
};
</script>

<style scoped>
</style>
