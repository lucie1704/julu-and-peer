<route lang="yaml">
path: /customer/payment/shipping
name: customer-payment-shipping
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { PlaceOrder } from '~/dto';
import router from '~/router/router.ts';
import { useCart } from '~/stores/cart';
import { useCustomer } from '~/stores/customer';
import { useOrder } from '~/stores/order';

const cartStore = useCart();
const orderStore = useOrder();
const customerStore = useCustomer();

//TODO: Put email in shippingInfo

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
  phone: '',
});

onMounted(async() => {
  await customerStore.fetchByUserId('3');

  await cartStore.fetchCartProducts(customerStore.customerId as string);
});

const removeItem = async (cartItemId: string) => {
  try {
    await cartStore.deleteCartItem(cartItemId);
    await cartStore.fetchCartProducts(customerStore.customerId as string);
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};

const updateQuantity = async (cartItemId: string, newQuantity: number) => {
  try {
    await cartStore.cartItemQuantityUpdate({
      cartItemId,
      newQuantity
    });
    await cartStore.fetchCartProducts(customerStore.customerId as string);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

const calculateTotal = (
  totalPrice: number,
  totalDiscount: number,
  shippingFee: number
) => {
  return computed(() => {
    return totalPrice + shippingFee - totalDiscount;
  });
};

const submitForm = async () => {
  // @TODO: Implémenter le paiement
  if (!email.value || !shippingInfo.value || !cartStore.cartProducts)
    return console.error('Form validation failed!');

    const orderData: PlaceOrder = {
    shippingFee: 20.0,
    products: cartStore.cartProducts.availableProducts.map((cartItem) => ({
      id: Number(cartItem.Product?.id),
      name: cartItem.Product?.name,
      description: cartItem.Product?.description,
      price: cartItem.Product?.price,
      quantity: cartItem.quantity
    })),
    shippingInfo: shippingInfo.value,
    email: email.value,
    customerId: customerStore.customerId as string
  };

  try {
    await orderStore.placeOrder(orderData);
    const cartId = cartStore.cartProducts.cart.id;
    if (cartId) await cartStore.deleteCart(cartId);

    router.push('/');
    cartStore.cartProducts = undefined;
  } catch (error) {
    console.error('Error to confirm order : ', error);
  }
};
</script>

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
              v-for="cartProduct in cartStore.cartProducts?.availableProducts"
              :key="cartProduct.id"
              class="flex py-6"
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

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div
                    class="flex justify-between text-base font-medium text-gray-900"
                  >
                    <h3>
                      <a>{{ cartProduct.Product.name }}</a>
                    </h3>
                    <p class="ml-4">
                      {{ cartProduct.Product.price }}$
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ cartProduct.Product.ProductFormat.name }}
                  </p>
                </div>

                <div class="flex flex-1 items-end justify-between text-sm">
                  <select
                    v-model="cartProduct.quantity"
                    class="m-1 p-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    @change="cartProduct.id && updateQuantity(cartProduct.id, cartProduct.quantity)"
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
                      @click="cartProduct.id && removeItem(cartProduct.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div
            v-if="cartStore.cartProducts"
            class="mt-6 border-t border-gray-200 pt-4"
          >
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Subtotal</p>
              <p>{{ cartStore.cartProducts.totalPrice }}</p>
            </div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Total Discount</p>
              <p>{{ cartStore.cartProducts.totalDiscount }}</p>
            </div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Total Products</p>
              <p>{{ cartStore.cartProducts.cartTotalProductCount }}</p>
            </div>
            <div
              class="flex justify-between text-sm font-medium text-gray-900 mt-4"
            >
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div class="border-t border-gray-200 mt-4" />
            <div
              class="flex justify-between text-sm font-medium text-gray-900 mt-4"
            >
              <p>Total</p>
              <p>
                {{
                  calculateTotal(
                    cartStore.cartProducts.totalPrice,
                    cartStore.cartProducts.totalDiscount,
                    10
                  )
                }}
              </p>
            </div>
          </div>
          <button
            class="w-full bg-indigo-600 text-white rounded-md py-2 mt-4 hover:bg-indigo-700"
          >
            Confirm order
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
