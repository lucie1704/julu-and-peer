<route lang="yaml">
  path: /customer/payment/shipping
  name: customer-payment-shipping
  meta:
    layout: AppLayout
</route>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import { computed, onMounted, ref } from 'vue';
import { API_URL, VUE_APP_STRIPE_PUBLIC_KEY } from '~/constants';
import { BillingInfo, ShippingInfo } from '~/dto';
import { useCart } from '~/stores/cart';
import { useCustomer } from '~/stores/customer';
import { getUserId } from '~/utils/authUtils';

const cartStore = useCart();
const customerStore = useCustomer();

const shippingInfo = ref<ShippingInfo>({
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  country: 'France',
  state: '',
  postalCode: '',
  phone: '',
});

const billingInfo = ref<BillingInfo>({
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  country: 'France',
  state: '',
  postalCode: '',
  phone: ''
});

const shippingErrors = ref<Record<keyof ShippingInfo, boolean>>({
  firstName: false,
  lastName: false,
  address: false,
  apartment: false,
  city: false,
  country: false,
  state: false,
  postalCode: false,
  phone: false,
});

const billingErrors = ref<Record<keyof BillingInfo, boolean>>({
  firstName: false,
  lastName: false,
  address: false,
  apartment: false,
  city: false,
  country: false,
  state: false,
  postalCode: false,
  phone: false,
});

const formError = ref('');

onMounted(async () => {
  await customerStore.fetchByUserId(getUserId());
  await cartStore.fetchCartProducts(customerStore.customerId as string);
});

const validateForm = (): boolean => {
  let isValid = true;

  Object.keys(shippingErrors.value).forEach(key => {
    const typedKey = key as keyof ShippingInfo;
    if (shippingInfo.value[typedKey].trim() === '') {
      shippingErrors.value[typedKey] = true;
      isValid = false;
    } else {
      shippingErrors.value[typedKey] = false;
    }
  });

  Object.keys(billingErrors.value).forEach(key => {
    const typedKey = key as keyof BillingInfo;
    if (billingInfo.value[typedKey].trim() === '') {
      billingErrors.value[typedKey] = true;
      isValid = false;
    } else {
      billingErrors.value[typedKey] = false;
    }
  });

  return isValid;
};

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
    const total = totalPrice + shippingFee - totalDiscount;
    return total.toFixed(2);
  });
};

const submitForm = async () => {
  if (!validateForm()) {
    formError.value = 'Veuillez remplir toutes les informations avant de procéder au paiement.';
    return;
  } else {
    // WARNING: This part is gonna move somewhere else when tables are cleaned
    const stripe = await loadStripe(VUE_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(`${API_URL}/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartStore.cartProducts?.availableProducts,
      }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  }

  const orderDatas = {
    shippingFee: 1.80,
    products: cartStore.cartProducts?.availableProducts.map((cartItem) => ({
      // @ts-expect-error id issue
      id: cartItem.Product?.id,
      name: cartItem.Product?.name,
      description: cartItem.Product?.description,
      price: cartItem.Product?.price,
      quantity: cartItem.quantity
    })) || [],
    customerId: customerStore.customerId as string
  };

  try {
    const ordered_products = cartStore.cartProducts?.availableProducts;
    const cartId = cartStore.cartProducts?.cart.id;

    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    const response = await fetch(`${API_URL}/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: ordered_products,
        order_datas: orderDatas,
        shipping_info: shippingInfo.value,
        billing_info: billingInfo.value,
        cart_id: cartId
      }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  } catch (error) {
    console.error('Error to confirm order:', error);
  }
};
</script>

<template>
  <div class="min-h-screen py-12 bg-gray-100">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <form
        class="grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        @submit.prevent="submitForm"
      >
        <div class="p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold">
            Informations de livraison
          </h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700"
              >Prénom</label>
              <input
                id="first-name"
                v-model="shippingInfo.firstName"
                type="text"
                name="first-name"
                :class="shippingErrors.firstName
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.firstName ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-medium text-gray-700"
              >Nom</label>
              <input
                id="last-name"
                v-model="shippingInfo.lastName"
                type="text"
                name="last-name"
                :class="shippingErrors.lastName
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.lastName ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
              >Adresse</label>
              <input
                id="address"
                v-model="shippingInfo.address"
                type="text"
                name="address"
                :class="shippingErrors.address
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.address ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="apartment"
                class="block text-sm font-medium text-gray-700"
              >Appartement, suite, etc.</label>
              <input
                id="apartment"
                v-model="shippingInfo.apartment"
                type="text"
                name="apartment"
                :class="shippingErrors.apartment
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.apartment ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="city"
                class="block text-sm font-medium text-gray-700"
              >Ville</label>
              <input
                id="city"
                v-model="shippingInfo.city"
                type="text"
                name="city"
                :class="shippingErrors.city
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.city ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >Pays</label>
              <select
                id="country"
                v-model="shippingInfo.country"
                name="country"
                :class="shippingErrors.country
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.country ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
                <option>France</option>
              </select>
            </div>
            <div>
              <label
                for="state"
                class="block text-sm font-medium text-gray-700"
              >Commune</label>
              <input
                id="state"
                v-model="shippingInfo.state"
                type="text"
                name="state"
                :class="shippingErrors.state
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.state ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="postal-code"
                class="block text-sm font-medium text-gray-700"
              >Code Postale</label>
              <input
                id="postal-code"
                v-model="shippingInfo.postalCode"
                type="text"
                name="postal-code"
                :class="shippingErrors.postalCode
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.postalCode ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700"
              >Téléphone</label>
              <input
                id="phone"
                v-model="shippingInfo.phone"
                type="text"
                name="phone"
                :class="shippingErrors.phone
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: shippingErrors.phone ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
          </div>
        </div>

        <div class="flex flex-col p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold">
            Récapitulatif de commande
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
                class="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md"
              >
                <img
                  :src="cartProduct.Product.Images?.[0].path"
                  :alt="cartProduct.Product.Images?.[0].alt"
                  class="object-cover object-center w-full h-full"
                >
              </div>

              <div class="flex flex-col flex-1 ml-4">
                <div>
                  <div
                    class="flex justify-between text-base font-medium text-gray-900"
                  >
                    <h3>
                      <a>{{ cartProduct.Product.name }}</a>
                    </h3>
                    <p class="ml-4">
                      {{ cartProduct.Product.price }} €
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ cartProduct.Product.ProductFormat.name }}
                  </p>
                </div>

                <div class="flex items-end justify-between flex-1 text-sm">
                  <select
                    v-model="cartProduct.quantity"
                    class="block p-1 m-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div
            v-if="cartStore.cartProducts"
            class="pt-4 mt-6 border-t border-gray-200"
          >
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Sous-total</p>
              <p>{{ cartStore.cartProducts.totalPrice }} €</p>
            </div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Remise Totale</p>
              <p>{{ cartStore.cartProducts.totalDiscount }}</p>
            </div>
            <div
              class="flex justify-between text-base font-medium text-gray-900"
            >
              <p>Total Produits</p>
              <p>{{ cartStore.cartProducts.cartTotalProductCount }}</p>
            </div>
            <div
              class="flex justify-between mt-4 text-sm font-medium text-gray-900"
            >
              <p>Frais de livraison</p>
              <p>1.80 €</p>
            </div>
            <div class="mt-4 border-t border-gray-200" />
            <div
              class="flex justify-between mt-4 text-sm font-medium text-gray-900"
            >
              <p>Total</p>
              <p>
                {{
                  calculateTotal(
                    cartStore.cartProducts.totalPrice,
                    cartStore.cartProducts.totalDiscount,
                    1.80
                  )
                }} €
              </p>
            </div>
          </div>
          <div
            v-if="formError"
            class="p-4 text-red-700 bg-red-100 border border-red-300 rounded-md"
          >
            {{ formError }}
          </div>
          <button
            class="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Payer
          </button>
        </div>

        <div class="p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold">
            Informations de facturation
          </h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                for="billing-first-name"
                class="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                id="billing-first-name"
                v-model="billingInfo.firstName"
                type="text"
                name="billing-first-name"
                :class="billingErrors.firstName
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.firstName ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="billing-last-name"
                class="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                id="billing-last-name"
                v-model="billingInfo.lastName"
                type="text"
                name="billing-last-name"
                :class="billingErrors.lastName
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.lastName ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="billing-address"
                class="block text-sm font-medium text-gray-700"
              >
                Adresse
              </label>
              <input
                id="billing-address"
                v-model="billingInfo.address"
                type="text"
                name="billing-address"
                :class="billingErrors.address
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.address ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="billing-apartment"
                class="block text-sm font-medium text-gray-700"
              >
                Appartement, suite, etc.
              </label>
              <input
                id="billing-apartment"
                v-model="billingInfo.apartment"
                type="text"
                name="billing-apartment"
                :class="billingErrors.apartment
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.apartment ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="billing-city"
                class="block text-sm font-medium text-gray-700"
              >
                Ville
              </label>
              <input
                id="billing-city"
                v-model="billingInfo.city"
                type="text"
                name="billing-city"
                :class="billingErrors.city
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.city ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="billing-country"
                class="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <select
                id="billing-country"
                v-model="billingInfo.country"
                name="billing-country"
                :class="billingErrors.country
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.country ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
                <option>France</option>
              </select>
            </div>
            <div>
              <label
                for="billing-state"
                class="block text-sm font-medium text-gray-700"
              >
                Commune
              </label>
              <input
                id="billing-state"
                v-model="billingInfo.state"
                type="text"
                name="billing-state"
                :class="billingErrors.state
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.state ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div>
              <label
                for="billing-postal-code"
                class="block text-sm font-medium text-gray-700"
              >
                Code Postale
              </label>
              <input
                id="billing-postal-code"
                v-model="billingInfo.postalCode"
                type="text"
                name="billing-postal-code"
                :class="billingErrors.postalCode
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.postalCode ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
            <div class="sm:col-span-2">
              <label
                for="billing-phone"
                class="block text-sm font-medium text-gray-700"
              >
                Téléphone
              </label>
              <input
                id="billing-phone"
                v-model="billingInfo.phone"
                type="text"
                name="billing-phone"
                :class="billingErrors.phone
                  ? 'block w-full p-2 m-1 text-gray-900 bg-white rounded-md shadow-sm sm:text-sm'
                  : 'block w-full p-2 m-1 text-gray-900 bg-white border rounded-md shadow-sm sm:text-sm'
                "
                :style="{
                  borderColor: billingErrors.phone ? 'red' : 'gray',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }"
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>