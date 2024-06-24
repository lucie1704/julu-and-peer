import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '~/stores';
import generatedRoutes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
});

router.beforeEach((to, from, next) => {
  const authStore = useAuth();

  if (to.name !== 'Login' && to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  }
  else {
    next();
  } 
});

router.afterEach((to, from, next) => {
  console.log(`from "${from.name?.toString()}" to "${to.name?.toString()}"`);
});

export default router;