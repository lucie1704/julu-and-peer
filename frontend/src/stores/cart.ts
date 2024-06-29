import { defineStore } from 'pinia';
import { ref } from 'vue';
import cartAPI from '~/api/cart';
import { CartI, CartItemI, CartProductI, createCartI } from '~/dto';
import router from '~/router/router';

export const useCart = defineStore('cart', () => {
  const cart = ref<CartI>();
  const cartProducts = ref<CartProductI>();
  const cartItem = ref<CartItemI>();
  const quantity = ref<number>();
  const message = ref<string>();

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

  const addCartItem = async (data: createCartI) => {
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
    try {
      const response = await cartAPI.getCartsProducts(jwt_token, customerId);
      cartProducts.value = response;
    } catch (error) {
      console.error('Failed to fetch cart Products:', error);
    }
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
      const response = await cartAPI.deleteCartItem(jwt_token, id);
      message.value = response;
    } catch (error) {
      console.error('Failed to delete CartItem:', error);
    }
  };

  const deleteCart = async (id: string) => {
    // Retrieve JWT token from auth module (placeholder)
    const jwt_token = '';
    try {
      const response = await cartAPI.deleteCart(jwt_token, id);
      cartProducts.value = undefined;
      message.value = response;
    } catch (error) {
      console.error('Failed to delete Cart:', error);
    }
  };

  return {
    cart,
    cartProducts,
    cartItem,
    quantity,
    message,
    fetchCartByCustomerId,
    createCart,
    addCartItem,
    fetchCartProducts,
    cartItemQuantityUpdate,
    deleteCartItem,
    deleteCart
  };
});
