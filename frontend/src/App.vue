<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">Julupeer</div>
      <div class="flex space-x-4">
        <router-link class="btn" to="/">Home</router-link>
        <router-link class="btn" to="/login" v-if="!isLoggedIn">Login</router-link>
        <router-link class="btn" to="/signup" v-if="!isLoggedIn">Signup</router-link>
        <button class="btn" @click="logout" v-if="isLoggedIn">Logout</button>
        <!-- <router-link class="btn" to="/updatePassword" v-if="isLoggedIn">UpdatePassword</router-link> -->
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
//@ts-ignore
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
const logout = () => store.dispatch('auth/logout')
</script>


<style scoped>
.btn {
  @apply bg-gray-700 text-white rounded-md px-4 py-2 hover:bg-gray-600 transition;
}
</style>
