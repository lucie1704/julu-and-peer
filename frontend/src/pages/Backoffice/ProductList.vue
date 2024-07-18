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
  const { data, loading, error } = getDataTable(url);
  const { options, loading: optionsLoading, error: errorOptions} = getDataOptions(url);
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Produits
    </h1>
    <DataTable
      :data="data"
      :loading="loading"
      :error="error"
      :url="url"
    >
      <!-- Start Edit Form Slot-->
      <template #form="{ item, submit }">
        <v-card class="text-center pa-5">
          <v-card-title>{{ item.id ? 'Modifier un produit' : 'Créer un produit' }}</v-card-title>
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
                <v-text-field
                  v-model="item.availableStock"
                  label="Stock disponible"
                  required
                  type="number"
                />
                <v-text-field
                  v-model="item.imageSrc"
                  label="Image Source"
                />
                <v-text-field
                  v-model="item.imageAlt"
                  label="Image Alt Text"
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
                  {{ item.id ? 'Modifier' : 'Créer' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </template>
      <!-- End Edit Form Slot -->
    </DataTable>
  </div>
</template>