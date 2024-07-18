<route lang="yaml">
path: /admin/users
name: admin-users
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import DataTable from '~/components/backoffice/DataTable.vue';
  import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'users';
  const { data, loading, error } = getDataTable(url);
</script>

<template>
  <div class="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Utilisateurs
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
          <v-card-title>{{ item.id ? 'Modifier un utilisateur' : 'Créer un utilisateur' }}</v-card-title>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.firstname"
                  label="Prénom"
                />
                <v-text-field
                  v-model="item.lastname"
                  label="Nom"
                />
                <v-text-field
                  v-model="item.email"
                  label="Email"
                  required
                  type="email"
                />
                <v-text-field
                  v-model="item.photo"
                  label="Photo"
                />
                <v-select
                  v-model="item.role"
                  :items="['user', 'admin']"
                  label="Rôle"
                />
                <!--<v-checkbox
                  v-model="item.active"
                  label="Actif"
                />-->
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
