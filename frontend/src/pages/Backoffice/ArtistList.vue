<route lang="yaml">
  path: /admin/productartists
  name: admin-productartists
  meta:
    requiresAdmin: true
    layout: BackofficeLayout
</route>

<script lang="ts" setup>
import { ref } from 'vue';
import DataTable from '~/components/backoffice/DataTable.vue';
import { getDataOptions } from '~/composables/backoffice/getDataOptions';
import { getDataTable } from '~/composables/backoffice/getDataTable';
import type { ApiCall } from '~/composables/form';
import { useForm } from '~/composables/form';
import { API_URL } from '~/constants';
import { CategoryForm } from '~/schema/productSchema';

const url = 'productartists';
const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
const { options } = getDataOptions(url);

const apiCall = ref<ApiCall>({
  method: 'post',
  endpoint: `${API_URL}/${url}`,
});
const schema = CategoryForm;
const initialValues = ref();
const isNewArtist = ref<boolean>(false);

const updateApiCall = (payload: Record<string, string>): void => {
  isNewArtist.value = !payload.id;
  if (payload.id) {
    apiCall.value.method = 'patch';
    apiCall.value.endpoint = `${API_URL}/${url}/${payload.id}`;
  } else {
    apiCall.value.method = 'post';
    apiCall.value.endpoint = `${API_URL}/${url}`;
  }
  initialValues.value = { ...payload };
  for (let key in formData) {
    updateField(key as keyof typeof formData, initialValues.value[key]);
  }
};

const onSubmitEditItem = async(data: any) => {
  console.log('successfully added/edited an artist !');
  console.log(data);
};

const {
  formData,
  errors,
  serverError,
  isSubmitting,
  updateField,
  cancelSubmit,
  handleSubmit,
  resetForm
} = useForm(
  schema,
  apiCall.value,
  onSubmitEditItem,
  initialValues.value
);
</script>

<template>
  <v-container>
    <h4 class="text-h4 font-bold tracking-tight text-gray-900">
      Artistes
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
      @update-item="updateApiCall"
    >
      <!-- Start Edit Form Slot-->
      <template #form>
        <v-card class="text-center pa-5">
          <v-card-title>{{ isNewArtist ? 'Nouvel artiste' : 'Modifier l\'artiste' }}</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.name"
                  label="Nom du genre"
                  :error-messages="errors.name"
                  @update:model-value="updateField('name', formData.name)"
                />
                <v-text-field
                  v-model="formData.description"
                  label="Description"
                  :error-messages="errors.description"
                  @update:model-value="updateField('description', formData.description)"
                />
              </v-col>
            </v-row>
            <v-row v-if="serverError">
              <v-col class="text-red">
                {{ serverError }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  type="submit"
                  color="blue"
                  :loading="isSubmitting"
                  block
                >
                  {{ isNewArtist ? 'Créer' : 'Modifier' }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  variant="outlined"
                  block
                  @click="resetForm"
                >
                  Ré initialiser
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  variant="outlined"
                  color="error"
                  block
                  @click="cancelSubmit"
                >
                  Annuler la requête
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