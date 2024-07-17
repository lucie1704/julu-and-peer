<route lang="yaml">
path: /confirm-email/:token
name: confirm-email
meta:
  layout: AppLayout
</route>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import * as z from 'zod';
import { ConfirmEmail } from '~/dto';
import { useAuth } from '~/stores/auth';

const route = useRoute();
const authStore = useAuth();

const emailToken = route.params.token as string;
const isPasswordVisible = ref(false);
const isPasswordConfirmationVisible = ref(false);

const validationSchema = toTypedSchema(
  z
    .object({
      password: z.string(),
      passwordConfirmation: z.string()
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords don\'t match',
      path: ['passwordConfirmation']
    })
);

const { validate, errors, values } = useForm<ConfirmEmail>({
  validationSchema
});

const { value: password } = useField<string>('password');
const { value: passwordConfirmation } = useField<string>(
  'passwordConfirmation'
);

const submitForm = async () => {
  const formValidation = await validate();

  if (formValidation.valid) {
    const user = values;
    authStore.confirmEmail({ user, emailToken });
  }
};
</script>

<template>
  <div
    class="max-w-md mx-auto bg-white text-center rounded-lg shadow-lg p-6 my-6"
  >
    <h3 class="text-3xl font-bold my-6">
      Confirme ton compte
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
              label="Mot de passe"
              hide-details
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
              :hide-details="!errors.passwordConfirmation"
              required
              @click:append-inner="
                isPasswordConfirmationVisible = !isPasswordConfirmationVisible
              "
            />
          </v-col>
        </v-row>
      </v-container>

      <v-btn
        color="blue"
        type="submit"
        class="mt-5"
      >
        Confirmer
      </v-btn>
    </v-form>
  </div>
</template>
