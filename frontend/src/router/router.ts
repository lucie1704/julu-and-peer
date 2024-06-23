import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '~/stores/auth';
import generatedRoutes from '~pages';

// const authStore = useAuthStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
});

// router.beforeEach(async (to) => {
//   if (to.meta.requiresAuth) {
//     if (!authStore.isAuthenticated) {
//       return {
//         path: '/login',
//         query: {
//           redirect: to.fullPath,
//         },
//       };
//     }
//   }
// });

export default router;