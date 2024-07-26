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
import type { ApiCall } from '~/composables/form';
import { useForm } from '~/composables/form';
import { API_URL } from '~/constants';
import { ProductForm } from '~/schema/productSchema';

const url = 'products';
const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);
const { options } = getDataOptions(url);

const apiCall = ref<ApiCall>({
  method: 'post',
  endpoint: `${API_URL}/${url}`,
});
const schema = ProductForm;
const initialValues = ref();
const isNewProduct = ref<boolean>(false);

const updateApiCall = (payload: Record<string, string>): void => {
  isNewProduct.value = !payload._id;
  if (payload._id) {
    apiCall.value.method = 'patch';
    apiCall.value.endpoint = `${API_URL}/${url}/${payload._id}`;
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
  console.log('successfully added/edited a poduct !');
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
          <v-card-title>{{ isNewProduct ? 'Nouveau produit' : 'Modifier un produit' }}</v-card-title>
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
                  v-model="formData.ProductGenre"
                  :items="options.genres"
                  item-title="name"
                  item-value="id"
                  return-object
                  label="Genre"
                  :error-messages="errors.ProductGenre"
                  @update:model-value="updateField('ProductGenre', formData.ProductGenre)"
                />
                <v-select
                  v-model="formData.ProductFormat"
                  :items="options.formats"
                  item-title="name"
                  item-value="id"
                  return-object
                  label="Format"
                  :error-messages="errors.ProductFormat"
                  @update:model-value="updateField('ProductFormat', formData.ProductFormat)"
                />
                <v-select
                  v-model="formData.ProductArtist"
                  :items="options.artists"
                  item-title="name"
                  item-value="id"
                  return-object
                  label="Artiste"
                  :error-messages="errors.ProductArtist"
                  @update:model-value="updateField('ProductArtist', formData.ProductArtist)"
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
                  {{ isNewProduct ? 'Créer' : 'Modifier' }}
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