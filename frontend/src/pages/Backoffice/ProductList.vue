<route lang="yaml">
path: /admin/products
name: admin-products
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataOptions } from '~/composables/backoffice/getDataOptions';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'products';
  const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
  const { options } = getDataOptions(url);

</script>

<template>
  <v-container>
    <h4 class="font-bold tracking-tight text-gray-900 text-h4">
      Vinyles
    </h4>
    <data-table
      :data="data"
      :loading="loading"
      :error="error"
      :url="url"
      :new-item="options.newItem"
      :current-page="currentPage"
      :total-pages="totalPages"
      :set-page="setPage"
      :refresh="refresh"
    >
      <!-- Start Edit Form Slot-->
      <template #form="{ item, submit }">
        <v-card class="text-center pa-5">
          <v-card-title>{{ item._id ? 'Modifier un produit' : 'Créer un produit' }}</v-card-title>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <!-- TODO: Updates with new table changes -->
                <v-text-field
                  v-model="item.name"
                  label="Nom du produit"
                />
                <v-text-field
                  v-model="item.description"
                  label="Description"
                />
                <v-text-field
                  v-model="item.price"
                  label="Prix"
                  required
                  type="number"
                  prefix="€"
                />
                <v-text-field
                  v-model="item.discount"
                  label="Réduction"
                  type="number"
                  prefix="%"
                />
                <v-select
                  v-model="item.ProductGenre.id"
                  :items="options.genres"
                  item-title="name"
                  item-value="id"
                  label="Genre"
                  required
                />
                <v-select
                  v-model="item.ProductFormat.id"
                  :items="options.formats"
                  item-title="name"
                  item-value="id"
                  label="Format"
                  required
                />
                <v-select
                  v-model="item.ProductArtist.id"
                  :items="options.artists"
                  item-title="name"
                  item-value="id"
                  label="Artiste"
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
                  {{ item._id ? 'Modifier' : 'Créer' }}
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