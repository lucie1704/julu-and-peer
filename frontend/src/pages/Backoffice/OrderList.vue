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
  const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
  // TODO: Update getDataTable in order to supports orders.
</script>

<template>
  <v-container>
    <h4 class="text-h4 font-bold tracking-tight text-gray-900">
      Commandes
    </h4>
    <data-table
      :data="data"
      :loading="loading"
      :error="error"
      :url="url"
      :new-item="undefined"
      :current-page="currentPage"
      :total-pages="totalPages"
      :set-page="setPage"
      :refresh="refresh"
    />
  </v-container>
</template>