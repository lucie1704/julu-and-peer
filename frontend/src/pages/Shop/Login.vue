<route lang="yaml">
path: /login
name: login
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { UserLogin } from '~/dto';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();

const showErrors = ref(false);
const isPasswordVisible = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string()
  })
);

const { validate, errors, values } = useForm<UserLogin>({ validationSchema });

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = async () => {
  showErrors.value = true;
  const validateForm = await validate();

  if (validateForm.valid) {
    authStore.login(values);
  }
};
</script>

<template>
  <div
    class="max-w-sm mx-auto bg-white text-center rounded-lg shadow-lg p-6 my-6"
  >
    <h3 class="text-3xl font-bold my-6">
      Bienvenue !
    </h3>
    <form @submit.prevent="onSubmit">
      <v-row>
        <v-col>
          <v-text-field
            v-model="email"
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
            label="Mot de passe"
            required
            hide-details
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <router-link
            to="/forgot-password"
            class="text-blue-500 text-center text-sm"
          >
            Mot de passe oublié ?
          </router-link>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            type="submit"
            color="blue"
            class="mb-4"
          >
            Se connecter
          </v-btn>
        </v-col>
      </v-row>
    </form>

    <p class="text-gray-500 text-sm text-center">
      Pas encore de compte ?
      <router-link
        to="/signup"
        class="text-blue-500 text-sm mt-1"
      >
        Créer mon compte !
      </router-link>
    </p>
  </div>
</template>
