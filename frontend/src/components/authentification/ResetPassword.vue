<template>
  <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
    <div class="text-gray-500 text-lg mb-4">
      One more step!!!
    </div>
    <div class="text-3xl font-bold mb-4">
      Enter your password
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
        >Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
        <small
          v-if="passwordError"
          class="error"
        >{{ passwordError }}</small>
      </div>
      <div class="mb-5">
        <label
          for="password-confirmation"
          class="block mb-2 text-sm font-medium text-gray-900"
        > Password Confirmation</label>
        <input
          id="password-confirmation"
          v-model="passwordConfirmation"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
        <small
          v-if="passwordConfirmationError"
          class="error"
        >{{ passwordConfirmationError }}</small>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block mx-auto"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
//@ts-ignore
import { useStore } from 'vuex';
import { ResetPassword } from '../../dto/ResetPassword';
import { passwordSchema } from '../../validation/login';

const route = useRoute();

const emailToken = route.params.token as string;

const password = ref('');
const passwordConfirmation = ref('');

const passwordError = computed(() => {
  const parsedPassword = passwordSchema.safeParse(password.value);

  if (parsedPassword.success) {
    return '';
  }

  return parsedPassword.error.issues[0].message;
});

const passwordConfirmationError = computed(() => {
  if (password.value !== passwordConfirmation.value) {
    return 'Passwords do not match';
  }

  return '';
});

const submitForm = () => {

  if (passwordError.value || passwordConfirmationError.value) return console.log('Form validation failed!');

    const user : ResetPassword =  {
      'password': password.value,
      'passwordConfirm': passwordConfirmation.value
    };

    resetPassword(user, emailToken);
};

const store = useStore();

const resetPassword = (user: ResetPassword, emailToken: string) => store.dispatch('auth/resetPassword', { user, emailToken });

</script>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>