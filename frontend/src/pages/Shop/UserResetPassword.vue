<route lang="yaml">
path: /reset-password/:token
name: reset-password
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import * as z from 'zod';
import { ResetPassword } from '~/dto';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();
const route = useRoute();

const emailToken = ref<string>(route.params.token as string);
const isPasswordVisible = ref(false);
const isPasswordConfirmationVisible = ref(false);
const showErrors = ref(false);
const displayConfirmModal = ref(false);

const validationSchema = toTypedSchema(
  z
    .object({
      password: z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{12,}$/, {
          message:
            '12 caractères minimum avec au moins 1 majuscule, 1 minucule, 1 chiffre et 1 caractère spécial'
        }),
      passwordConfirmation: z.string()
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords don\'t match',
      path: ['passwordConfirmation']
    })
);

const { validate, errors, values } = useForm<ResetPassword>({
  validationSchema
});

const { value: password } = useField<string>('password');
const { value: passwordConfirmation } = useField<string>(
  'passwordConfirmation'
);

const submitForm = async () => {
  showErrors.value = true;
  const formValidation = await validate();

  if (formValidation.valid) {
    authStore.resetPassword({
      user: values,
      emailToken: emailToken.value
    });
    displayConfirmModal.value = true;
  }
};
</script>

<template>
  <div
    class="max-w-xl mx-auto bg-white text-center rounded-lg shadow-lg p-6 my-6"
  >
    <h3 class="text-3xl font-bold my-6">
      Modifier mon mot de passe
    </h3>
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              :append-inner-icon="
                isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
              "
              :type="isPasswordVisible ? 'text' : 'password'"
              name="password"
              hint="12 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
              persistent-hint
              label="Mot de passe"
              :error-messages="showErrors ? errors.password : undefined"
              required
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="passwordConfirmation"
              :append-inner-icon="
                isPasswordConfirmationVisible
                  ? 'fa-solid fa-eye'
                  : 'fa-solid fa-eye-slash'
              "
              :type="isPasswordConfirmationVisible ? 'text' : 'password'"
              name="passwordConfirmation"
              label="Confirmer le mot de passe"
              :error-messages="errors.passwordConfirmation"
              required
              @click:append-inner="
                isPasswordConfirmationVisible = !isPasswordConfirmationVisible
              "
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
              Modifier mon mot de passe
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-dialog
      v-model="displayConfirmModal"
      max-width="500"
      persistent
    >
      <v-card
        title="Mise à jour du mot de passe !"
        text="Ton mot de passe a bien été modifié, connecte toi !"
      >
        <template #actions>
          <v-spacer />
          <v-btn
            color="blue"
            variant="flat"
            to="/login"
            @click="displayConfirmModal = false"
          >
            Se connecter
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
