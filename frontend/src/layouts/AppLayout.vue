<script lang="ts" setup>
import { Navbar } from '~/components';
</script>

<template>
  <navbar />
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
