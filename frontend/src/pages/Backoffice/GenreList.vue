<route lang="yaml">
  path: /admin/productgenres
  name: admin-productgenres
  meta:
    requiresAdmin: true
    layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataOptions } from '~/composables/backoffice/getDataOptions';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'productgenres';
  const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
  const { options } = getDataOptions(url);

</script>

<template>
  <v-container>
    <h4 class="text-h4 font-bold tracking-tight text-gray-900">
      Genres
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
    </data-table>
  </v-container>
</template>