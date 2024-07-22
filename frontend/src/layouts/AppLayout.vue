<script lang="ts" setup>
import { Navbar } from '~/components';
</script>

<template>
  <navbar />
  <v-main>
    <router-view />
  </v-main>
  <div
    class="w-full mt-10 bg-gray-800 d-flex flex-column"
  >
    <div class="text-center text-white w-100 pa-3">
      {{ new Date().getFullYear() }} — <strong>ESGI</strong>
    </div>
  </div>
</template>
