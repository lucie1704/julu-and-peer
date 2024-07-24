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
    <div class="justify-between text-center text-white w-100 pa-3">
      <router-link
        class="text-white underline underlin"
        to="/cgu"
      >
        Conditions Générales d'Utilisation (CGU)
      </router-link>
      <router-link
        class="text-white underline underlin"
        to="/cgv"
      >
        Conditions Générales de Vente (CGV)
      </router-link>
    </div>
  </div>
</template>
