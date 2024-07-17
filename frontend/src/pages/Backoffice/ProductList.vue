<route lang="yaml">
path: /admin/products
name: admin-products
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataTable } from '~/composables/backoffice/getDataTable';
  // import { getDataOptions } from '~/composables/backoffice/getDataOptions';

  const url = 'products';
  const { data, loading, error } = getDataTable(url);
  // TODO: Make OPTIONS call in order to get datas options for select ???
  // TODO: Make Create Form + Api Call
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Produits
    </h1>
    <button
      type="button"
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Créer un produit
    </button>
    <DataTable
      :data="data"
      :loading="loading"
      :error="error"
      :url="url"
    >
      <!-- Start Edit Form Slot-->
      <template #form="{ item, submit }">
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
                v-model="item.genreId"
                :items="data.ProductGenres"
                item-text="name"
                item-value="id"
                label="Genre"
                required
              />
              <v-select
                v-model="item.formatId"
                :items="data.ProductFormats"
                item-text="name"
                item-value="id"
                label="Format"
                required
              />
              <v-select
                v-model="item.artistId"
                :items="data.ProductArtists"
                item-text="name"
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
                Modifier
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </template>
      <!-- End Edit Form Slot -->
    </DataTable>
  </div>
</template>