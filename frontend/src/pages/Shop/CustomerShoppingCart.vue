<route lang="yaml">
path: /customer/shopping-cart
name: customer-shopping-cart
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ShoppingCart } from '~/components';
import { useCart } from '~/stores';

const cartStore = useCart();
const customerId = '2';

const deleteCartAfterTimeout = async () => {
  setTimeout(async () => {
    try {
      await cartStore.deleteCart(cartProducts.value?.cart.id);
      cartProducts.value = {};
      console.log('Cart deleted after 1 minute');
    } catch (error) {
      console.error('Error deleting cart after timeout:', error);
    }
  }, 60000);
};

onMounted(async () => {
  await cartStore.fetchCartProducts(customerId);

  if (cartStore.cartProducts.cart) {
    await deleteCartAfterTimeout();
  }
});

const updateQuantity = async (cartItemId: number, newQuantity: number) => {
  try {
    await cartStore.cartItemQuantityUpdate({
      cartItemId,
      newQuantity
    });
    await cartStore.fetchCartProducts(customerId);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

const removeItem = async (cartItemId: number) => {
  try {
    await cartStore.deleteCartItem(cartItemId);
    await cartStore.fetchCartProducts(customerId);
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};
</script>

<template>
  <shopping-cart
    v-if="cartStore.cartProducts"
    :cart-items="cartStore.cartProducts"
    @update-quantity="updateQuantity()"
    @remove-item="removeItem()"
  />
  <div v-else>
    Pas encore de produits dans le panier
  </div>
</template>
