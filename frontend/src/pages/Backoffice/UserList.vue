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
import type { ApiCall } from '~/composables/form';
import { useForm } from '~/composables/form';
import { API_URL } from '~/constants';
import { UserForm } from '~/schema/userSchema';

const url = 'users';
const { data, loading, error, currentPage, totalPages, setPage, refresh } = getDataTable(url);

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const apiCall = ref<ApiCall>({
  method: 'post',
  endpoint: `${API_URL}/${url}`,
  jwt: localStorage.getItem('jwt-token') || ''
});
const schema = UserForm;
const isEditUser = ref<boolean>();
const initialValues = ref();
const isNewUser = ref<boolean>(false);

const updateApiCall = (payload: Record<string, string>): void => {
  isNewUser.value = !payload.id;

  if (payload.id) {
    isEditUser.value = true;
    apiCall.value.method = 'patch';
    apiCall.value.endpoint = `${API_URL}/${url}/${payload.id}`;
  } else {
    isEditUser.value = false;
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
      @update-item="updateApiCall"
    >
      <!-- Start Edit Form Slot-->
      <template #form>
        <v-card class="text-center pa-5">
          <v-card-title>{{ isNewUser ? 'Nouvel utilisateur' : 'Modifier un utilisateur' }}</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="formData.firstname"
                  name="firstname"
                  label="Prénom"
                  :error-messages="errors.firstname"
                  @update:model-value="updateField('firstname', formData.firstname)"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="formData.lastname"
                  name="lastname"
                  label="Nom"
                  :error-messages="errors.lastname"
                  @update:model-value="updateField('lastname', formData.lastname)"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.email"
                  name="email"
                  label="Email"
                  type="email"
                  :error-messages="errors.email"
                  @update:model-value="updateField('email', formData.email)"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Mot de passe"
                  class="relative"
                  :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click:append="showPassword = !showPassword"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="formData.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  :error-messages="errors.passwordConfirm"
                  label="Confirmation du mot de passe"
                  class="relative"
                  :append-icon="showPasswordConfirm ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click:append="showPasswordConfirm = !showPasswordConfirm"
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
                  {{ isNewUser ? 'Créer' : 'Modifier' }}
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