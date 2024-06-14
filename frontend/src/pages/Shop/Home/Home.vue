<route lang="yaml">
  path: /
  name: home
  meta:
    layout: AppLayout
</route>

<script setup lang="ts">
import TheWelcome from '~/components/TheWelcome.vue';

async () => {
  //my call api
};
</script>

<template>
  <div>
    <TheWelcome />
    <v-btn prepend-icon="fa fa-file">
      Test button with very cool icon from fontawesome
    </v-btn>
  </div>
</template>
