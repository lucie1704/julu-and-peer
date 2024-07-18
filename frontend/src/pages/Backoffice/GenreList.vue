<route lang="yaml">
  path: /admin/productgenres
  name: admin-productgenres
  meta:
    requiresAdmin: true
    layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'productgenres';
  const { data, loading, error } = getDataTable(url);
  // TODO: Make Create Form + Api Call
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Genres
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
          <v-card-title>{{ item.id ? 'Modifier un genre' : 'Créer un genre' }}</v-card-title>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.name"
                  label="Nom du genre"
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