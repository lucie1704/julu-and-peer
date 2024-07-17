<route lang="yaml">
  path: /admin/orders
  name: admin-orders
  meta:
    requiresAdmin: true
    layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const { data, loading, error } = getDataTable('orders');
  // TODO: Make Create Form + Api Call
  // TODO: Make Edit Form + Api Call
  // TODO: Update getDataTable in order to supports orders.
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Commandes
    </h1>
    <button
      type="button"
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Créer une commande
    </button>
    <DataTable
      :data="data"
      :loading="loading"
      :error="error"
    />
  </div>
</template>