
import ShoppingCarts from "../components/cart/ShoppingCarts.vue";
import Shipping from "../components/order/Shipping.vue";


const orderRoutes = [
  { path: '/customer/shopping-carts', component: ShoppingCarts  },
  { path: '/customer/shipping', component: Shipping  }
]

export default orderRoutes;