<route lang="yaml">
path: /forgot-password
name: forgot-password
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { UserEmail } from '~/dto';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();
const showErrors = ref(false);
const displayConfirmModal = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email()
  })
);

const { validate, errors, values } = useForm<UserEmail>({ validationSchema });

const { value: email } = useField<string>('email');

const submitForm = async () => {
  showErrors.value = true;
  const formValidation = await validate();

  if (formValidation.valid) {
    authStore.forgotPassword(values);
    displayConfirmModal.value = true;
  }
};
</script>

<template>
  <div
    class="max-w-md mx-auto bg-white text-center rounded-lg shadow-lg p-6 my-6"
  >
    <h3 class="text-3xl font-bold my-6">
      Reset Password
    </h3>
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="email"
              type="email"
              name="email"
              label="Email"
              required
              :hide-details="!showErrors || !errors.email"
              :error-messages="showErrors ? errors.email : undefined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              type="submit"
              color="blue"
              class="my-4"
            >
              Réinitialiser mon mot de passe
            </v-btn>
          </v-col>
        </v-row>

        <p class="text-gray-500 text-sm text-center">
          Pas encore de compte ?
          <router-link
            to="/signup"
            class="text-blue-500 text-sm mt-1"
          >
            Créer mon compte
          </router-link>
        </p>
      </v-container>
    </v-form>

    <v-dialog
      v-model="displayConfirmModal"
      max-width="500"
      persistent
    >
      <v-card title="Mot de passe modifié avec succès">
        <template #actions>
          <v-spacer />
          <v-btn
            color="blue"
            variant="flat"
            to="/"
            @click="displayConfirmModal = false"
          >
            OK
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
