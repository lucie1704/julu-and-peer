<route lang="yaml">
path: /admin/product/:id
name: admin-product
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>
    <h1>Edit product {{ route.params.id }}</h1>
  </div>
</template>
