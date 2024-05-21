import { createRouter, createWebHistory } from 'vue-router';
import store from './../store/';
import authRoutes from './authRoutes';
import orderRoutes from './orderRoutes';
import productRoutes from './productRoutes';

const routes = [
  ...authRoutes,
  ...orderRoutes,
  ...productRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.state.auth.jwt_token) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }
});

export default router;