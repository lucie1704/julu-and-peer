<route lang="yaml">
  path: /
  name: home
  meta:
    layout: AppLayout
</route>

<script setup lang="ts">
import TheWelcome from '~/components/TheWelcome.vue';
</script>

<template>
  <div>
    <TheWelcome />
  </div>
</template>
