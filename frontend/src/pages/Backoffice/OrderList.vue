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
      :current-page="currentPage"
      :total-pages="totalPages"
      :set-page="setPage"
      :refresh="refresh"
    >
      <!-- Start Edit Form Slot-->
      <template #form="{ item, submit }">
        <v-card class="text-center pa-5">
          <v-card-title>{{ item.id ? 'Modifier une commande' : 'Créer une commande' }}</v-card-title>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.price"
                  label="Prix"
                  type="number"
                  step="0.01"
                  required
                />
                <v-text-field
                  v-model="item.paymentStatus"
                  label="Statut de paiement"
                  required
                />
                <v-text-field
                  v-model="item.deliveryStatus"
                  label="Statut de livraison"
                  required
                />
                <v-text-field
                  v-model="item.date"
                  label="Date"
                  type="date"
                  required
                />
                <v-text-field
                  v-model="item.customerId"
                  label="ID Client"
                  required
                />
                <v-text-field
                  v-model="item.customerAddressId"
                  label="ID Adresse Client"
                  required
                />
                <v-text-field
                  v-model="item.orderBillingId"
                  label="ID Facturation"
                  required
                />
                <v-text-field
                  v-model="item.shippingId"
                  label="ID Expédition"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  type="submit"
                  color="blue"
                >
                  {{ item.id ? 'Modifier' : 'Créer' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </template>
      <!-- End Edit Form Slot -->
    </data-table>
  </v-container>
</template>