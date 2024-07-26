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

  const url = 'customerorder';
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
      @update-item="console.log('update-item')"
    >
      <!-- Start Edit Form Slot-->
      <template #form>
        <v-card class="text-center pa-5">
          edit form for order list incoming
        </v-card>
      </template>
      <!-- End Edit Form Slot -->
    </data-table>
  </v-container>
</template>