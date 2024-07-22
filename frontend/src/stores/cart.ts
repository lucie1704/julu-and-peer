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
  const message = ref<string | null>(null);

  const fetchCartByCustomerId = async (customerId: string) => {
    try {
      const response = await cartAPI.getCartByCustomerId(customerId);
      cart.value = response;
    } catch (error) {
      message.value = `Panier non trouvé : ${error}`;
    }
  };

  const createCart = async (customerId: string) => {
    try {
      const response = await cartAPI.createCart(customerId);
      cart.value = response;
    } catch (error) {
      message.value = `Échec de la création du panier : ${error}`;
    }
  };

  const addCartItem = async (data: createCart) => {
    try {
      const response = await cartAPI.addToCartItem(data);
      cartItem.value = response;
      router.push({ name: 'customer-shopping-cart' });
    } catch (error) {
      message.value = `Échec de l'ajout de l'article au panier : ${error}`;
    }
  };

  const fetchCartProducts = async (customerId: string) => {
    try {
      const response = await cartAPI.getCartsProducts(customerId);
      cartProducts.value = response;
    } catch (error) {
      message.value = `Échec de la récupération des produits du panier : ${error}`;
    }
  };

  const cartItemQuantityUpdate = async (payload: {
    cartItemId: string,
    newQuantity: number
  }) => {
    try {
      const newQuantity = await cartAPI.cartItemQuantityUpdate(
        payload.cartItemId,
        payload.newQuantity
      );
      quantity.value = newQuantity;
    } catch (error) {
      message.value = `Échec de la mise à jour de la quantité de l'article du panier : ${error}`;
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      await cartAPI.deleteCartItem(id);
    } catch (error) {
      message.value = `Échec de la suppression de l'article du panier : ${error}`;
    }
  };

  const deleteCart = async (id: string) => {
    try {
      await cartAPI.deleteCart(id);
      cartProducts.value = undefined;
    } catch (error) {
      message.value = `Échec de la suppression du panier : ${error}`;
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
    deleteCart,
    message
  };
});
