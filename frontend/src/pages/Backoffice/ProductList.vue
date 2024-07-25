<route lang="yaml">
path: /admin/products
name: admin-products
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script lang="ts" setup>
import { ref } from 'vue';
import DataTable from '~/components/backoffice/DataTable.vue';
import { getDataOptions } from '~/composables/backoffice/getDataOptions';
import { getDataTable } from '~/composables/backoffice/getDataTable';
import type { ApiCall, RequestMethod } from '~/composables/form';
import { useForm } from '~/composables/form';
import { API_URL } from '~/constants';
import { ProductForm } from '~/schema/productSchema';

const url = 'products';
const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
const { options } = getDataOptions(url);

const apiCall = ref<ApiCall>({
  method: 'post',
  endpoint: `${API_URL}/${url}`,
  jwt: localStorage.getItem('jwt-token') || ''
});
const schema = ProductForm;
const isEditProduct = ref<boolean>();
const initialValues = ref();

const updateApiCall = (payload: Record<string, string>): void => {
  if (payload._id) {
    isEditProduct.value = true;
    apiCall.value.method = 'patch' as RequestMethod;
    apiCall.value.endpoint = `${API_URL}/${url}/${payload._id}`;
  } else {
    isEditProduct.value = false;
    apiCall.value.method = 'post';
    apiCall.value.endpoint = `${API_URL}/${url}`;
  }
  initialValues.value = { ...payload };
  for (let key in formData) {
    updateField(key as keyof typeof formData, initialValues.value[key]);
  }
};

const onSubmitEditItem = async(data: any) => {
  console.log('datatable form test hahahh');
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
      @update-item="updateApiCall"
    >
      <!-- Start Edit Form Slot-->
      <template #form>
        <v-card class="text-center pa-5">
          <v-card-title>Modifier un produit</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col>
                <!-- TODO: Updates with new table changes -->
                <v-text-field
                  v-model="formData.name"
                  label="Nom du produit"
                  :error-messages="errors.name"
                  @update:model-value="updateField('name', formData.name)"
                />
                <v-textarea
                  v-model="formData.description"
                  label="Description"
                  :error-messages="errors.description"
                  @update:model-value="updateField('description', formData.description)"
                />
                <v-text-field
                  v-model.number="formData.price"
                  label="Prix"
                  type="number"
                  prefix="€"
                  :error-messages="errors.price"
                  @update:model-value="updateField('price', formData.price)"
                />
                <v-text-field
                  v-model.number="formData.discount"
                  label="Réduction"
                  type="number"
                  prefix="%"
                  :error-messages="errors.discount"
                  @update:model-value="updateField('discount', formData.discount)"
                />
                <v-select
                  v-model="formData.genreId"
                  :items="options.genres"
                  item-title="name"
                  item-value="id"
                  label="Genre"
                  :error-messages="errors.genreId"
                  @update:model-value="updateField('genreId', formData.genreId)"
                />
                <v-select
                  v-model="formData.formatId"
                  :items="options.formats"
                  item-title="name"
                  item-value="id"
                  label="Format"
                  :error-messages="errors.formatId"
                  @update:model-value="updateField('formatId', formData.formatId)"
                />
                <v-select
                  v-model="formData.artistId"
                  :items="options.artists"
                  item-title="name"
                  item-value="id"
                  label="Artiste"
                  :error-messages="errors.artistId"
                  @update:model-value="updateField('artistId', formData.artistId)"
                />
              </v-col>
            </v-row>
            <v-row>
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
                >
                  Enregistrer
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  @click="resetForm"
                >
                  Ré initialiser le formulaire
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
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