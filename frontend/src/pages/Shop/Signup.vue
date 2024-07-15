<route lang="yaml">
path: /signup
name: signup
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { SignUp } from '~/dto';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();

const isPasswordVisible = ref(false);
const isPasswordConfirmationVisible = ref(false);
const showErrors = ref(false);
const displayConfirmModal = ref(false);

const validationSchema = toTypedSchema(
  z
    .object({
      firstname: z.string(),
      lastname: z.string(),
      email: z
        .string()
        .email({ message: 'Email invalide' })
        .min(5, { message: 'Email trop courte' })
        .max(30, { message: 'Email trop longue' }),
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

const { validate, errors, values } = useForm<SignUp>({ validationSchema });

const { value: firstname } = useField<string>('firstname');
const { value: lastname } = useField<string>('lastname');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: passwordConfirmation } = useField<string>(
  'passwordConfirmation'
);

const submitForm = async () => {
  showErrors.value = true;
  const formValidation = await validate();

  if (formValidation.valid) {
    authStore.signup(values);
    displayConfirmModal.value = true;
  }
};
</script>

<template>
  <div
    class="max-w-xl mx-auto bg-white text-center rounded-lg shadow-lg p-6 my-6"
  >
    <h3 class="text-3xl font-bold my-6">
      Nous rejoindre
    </h3>
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="firstname"
              name="firstname"
              label="Prénom"
              required
              :error-messages="errors.firstname"
              :hide-details="!errors.firstname"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="lastname"
              name="lastname"
              label="Nom"
              required
              :error-messages="errors.lastname"
              :hide-details="!errors.lastname"
            />
          </v-col>
        </v-row>

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
              Créer mon compte
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <p class="text-gray-500 text-sm text-center">
      Déjà un compte ?
      <router-link
        to="/login"
        class="text-blue-500 text-sm mt-1"
      >
        Me connecter
      </router-link>
    </p>

    <v-dialog
      v-model="displayConfirmModal"
      max-width="500"
      persistent
    >
      <v-card
        :title="`hey ${firstname}`"
        text="Nous t'avons envoyé un email pour valider ton compte."
      >
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
