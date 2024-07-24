import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { UserRole } from '~/dto';
import { useAuth } from '~/stores/auth';
import { useCart } from '~/stores/cart';
import generatedRoutes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes)
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuth();
  const cartStore = useCart();

  if ( to.name !== 'Login' && to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if ( to.meta.requiresAdmin && !(authStore.isAuthenticated && authStore.hasRole(UserRole.Admin))) {
    next({ name: 'login' });
  } else if ( to.meta.requiresCartNotEmpty && !authStore.isAuthenticated && cartStore.isCartEmpty) {
    next({ name: 'home' });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  console.log(`from "${from.name?.toString()}" to "${to.name?.toString()}"`);
});

export default router;