import { defineStore } from 'pinia';
import { ref } from 'vue';
import cartAPI from '~/api/cart';
import { Cart, CartItem, CartProduct, createCart } from '~/dto';
import router from '~/router/router';

export const useCart = defineStore('cart', () => {
  const cart = ref<Cart>();
  const cartProducts = ref<CartProduct>();
  const cartItem = ref<CartItem>();
  const quantity = ref<number>();

  const fetchCartByCustomerId = async (customerId: string) => {
    const jwt_token = '';
    try {
      const response = await cartAPI.getCartByCustomerId(jwt_token, customerId);
      cart.value = response;
    } catch (error) {
      console.error('Cart no found :', error);
    }
  };

  const createCart = async (customerId: string) => {
    const jwt_token = '';
    try {
      const response = await cartAPI.createCart(jwt_token, customerId);
      cart.value = response;
    } catch (error) {
      console.error('Failed to create cart :', error);
    }
  };

  const addCartItem = async (data: createCart) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
    try {
      const response = await cartAPI.addToCartItem(jwt_token, data);
      cartItem.value = response;
      router.push({ name: 'customer-shopping-cart' });
    } catch (error) {
      console.error('Failed to add CartItem : ', error);
    }
  };

  const fetchCartProducts = async (customerId: string) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
      const response = await cartAPI.getCartsProducts(jwt_token, customerId);
      if (response) return cartProducts.value = response;
  };

  const cartItemQuantityUpdate = async (payload: {
    cartItemId: string,
    newQuantity: number
  }) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
    try {
      const newQuantity = await cartAPI.cartItemQuantityUpdate(
        jwt_token,
        payload.cartItemId,
        payload.newQuantity
      );
      quantity.value = newQuantity;
    } catch (error) {
      console.error('Failed to update cartItem quantity:', error);
    }
  };

  const deleteCartItem = async (id: string) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
    try {
      await cartAPI.deleteCartItem(jwt_token, id);
    } catch (error) {
      console.error('Failed to delete CartItem:', error);
    }
  };

  const deleteCart = async (id: string) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
    try {
      await cartAPI.deleteCart(jwt_token, id);
      cartProducts.value = undefined;
    } catch (error) {
      console.error('Failed to delete Cart:', error);
    }
  };

  return {
    cart,
    cartProducts,
    cartItem,
    quantity,
    fetchCartByCustomerId,
    createCart,
    addCartItem,
    fetchCartProducts,
    cartItemQuantityUpdate,
    deleteCartItem,
    deleteCart
  };
});
