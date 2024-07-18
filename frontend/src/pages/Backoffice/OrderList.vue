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

  const url = 'customerorders';
  const { data, loading, error } = getDataTable(url);
  // TODO: Update getDataTable in order to supports orders.
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Commandes
    </h1>
    <DataTable
      :data="data"
      :loading="loading"
      :error="error"
      :url="url"
    />
  </div>
</template>