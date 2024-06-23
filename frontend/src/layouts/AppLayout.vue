<script lang="ts" setup>
import Navbar from '~/components/Navbar.vue';
</script>

<template>
  <navbar />
  <!-- <v-app-bar title="Julu & Peer">
    <router-link to="/about">
      About
    </router-link>    
    <router-link to="/">
      Home
    </router-link>
  </v-app-bar> -->
  <v-main>
    <router-view />
  </v-main>
  <v-footer
    color="blue"
    class="d-flex flex-column"
  >
    <div class="text-center w-full">
      {{ new Date().getFullYear() }} — <strong>ESGI</strong>
    </div>
  </v-footer>
</template>