<route lang="yaml">
path: /admin/users
name: admin-users
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
  import { ref } from 'vue';
import DataTable from '~/components/backoffice/DataTable.vue';
import { getDataTable } from '~/composables/backoffice/getDataTable';

  const url = 'users';
  const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);

  const showPassword = ref(false);
  const showPasswordConfirm = ref(false);

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const togglePasswordConfirmVisibility = () => {
    showPasswordConfirm.value = !showPasswordConfirm.value;
  };

</script>

<template>
  <v-container>
    <h4 class="text-h4 font-bold tracking-tight text-gray-900">
      Utilisateurs
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
    >
      <!-- Start Edit Form Slot-->
      <template #form="{ item, submit }">
        <v-card class="text-center pa-5">
          <v-card-title>{{ item.id ? 'Modifier un utilisateur' : 'Créer un utilisateur' }}</v-card-title>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.firstname"
                  label="Prénom"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.lastname"
                  label="Nom"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.email"
                  label="Email"
                  required
                  type="email"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  label="Password"
                  class="relative"
                >
                  <template #append>
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      @click="togglePasswordVisibility"
                    >
                      <svg
                        v-if="showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 15.172a4 4 0 00-5.657 0M17.657 8.343a4 4 0 010 5.657M3.343 3.343a4 4 0 015.657 0M12 12a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.75 3.75L20.25 20.25M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM12 12a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="item.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  required
                  label="Confirm Password"
                  class="relative"
                >
                  <template #append>
                    <span
                      class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      @click="togglePasswordConfirmVisibility"
                    >
                      <svg
                        v-if="showPasswordConfirm"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 15.172a4 4 0 00-5.657 0M17.657 8.343a4 4 0 010 5.657M3.343 3.343a4 4 0 015.657 0M12 12a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.75 3.75L20.25 20.25M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zM12 12a4 4 0 100-8 4 4 0 000 8z"
                        />
                      </svg>
                    </span>
                  </template>
                </v-text-field>
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