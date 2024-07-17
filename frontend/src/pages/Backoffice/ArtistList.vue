<route lang="yaml">
  path: /admin/productartists
  name: admin-productartists
  meta:
    requiresAdmin: true
    layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'productartists';
  const { data, loading, error } = getDataTable(url);
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Artistes
    </h1>
    <button
      type="button"
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Créer un artiste
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
              <v-text-field
                v-model="item.name"
                label="Nom de l'artiste"
              />
              <v-text-field
                v-model="item.description"
                label="Description"
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