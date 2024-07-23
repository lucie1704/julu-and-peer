
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();

const cartTotalProductCount = ref<number>(0);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const logout = () => authStore.logout();
</script>

<template>
  <v-app-bar
    scroll-behavior="hide"
    flat
    :height="90"
    elevation="1"
  >
    <v-container>
      <v-row>
        <v-col>
          <router-link to="/">
            <img
              class="h-16 w-auto"
              src="../../public/logo-julu-and-peer.png"
              alt="Logo Julu&Peer"
            >
          </router-link>
        </v-col>

        <v-spacer />

        <v-col class="ml-auto flex items-center">
          <div
            class="flex flex-1 items-center justify-end space-x-6"
          >
            <router-link
              v-if="!isAuthenticated"
              class="text-sm font-medium text-gray-700 hover:text-gray-800"
              to="/login"
            >
              Login
            </router-link>
            <span
              class="h-6 w-px bg-gray-200"
              aria-hidden="true"
            />
            <router-link
              v-if="!isAuthenticated"
              class="text-sm font-medium text-gray-700 hover:text-gray-800"
              to="/signup"
            >
              Signup
            </router-link>
            <router-link
              v-if="isAuthenticated"
              class="text-sm font-medium text-gray-700 hover:text-gray-800"
              to="/signup"
              @click="logout"
            >
              Logout
            </router-link>
          </div>
        </v-col>

        <v-col
          cols="auto"
          class="flex items-center"
        >
          <div class="ml-4 flow-root lg:ml-6">
            <router-link
              class="group -m-2 flex items-center p-2"
              to="/customer/shopping-cart"
            >
              <v-icon icon="fas fa-cart-shopping" />
              <span
                class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
              >{{ cartTotalProductCount }}</span>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>