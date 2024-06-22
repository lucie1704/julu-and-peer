<template>
  <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
    <div class="text-gray-500 text-lg mb-4">
      Free up !!!
    </div>
    <div class="text-3xl font-bold mb-4">
      Update your password
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label
          for="current-password"
          class="block mb-2 text-sm font-medium text-gray-900"
        >Current password</label>
        <input
          id="current-password"
          v-model="currentPassword"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
        <small
          v-if="currentPasswordError"
          class="error"
        >{{ currentPasswordError }}</small>
      </div>

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
//@ts-ignore
import { useStore } from 'vuex';
import { UpdatePassword } from '../../dto/updatePassword';
import { currentPasswordSchema, passwordSchema  } from '../../validation/updatePassword';

const currentPassword = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const passwordError = computed(() => {
  const parsedPassword = passwordSchema.safeParse(password.value);

  if (parsedPassword.success) {
    return '';
  }

  return parsedPassword.error.issues[0].message;
});

const currentPasswordError = computed(() => {
  const parsedCurrentPassword = currentPasswordSchema.safeParse(currentPassword.value);

  if (parsedCurrentPassword.success) {
    return '';
  }

  return parsedCurrentPassword.error.issues[0].message;
});

const passwordConfirmationError = computed(() => {
  if (password.value !== passwordConfirmation.value) {
    return 'Passwords do not match';
  }

  return '';
});

const submitForm = () => {

  if (
    currentPasswordError.value
    || passwordError.value
    || passwordConfirmationError.value) return console.log('Form validation failed!');

    const user : UpdatePassword =  {
      'passwordCurrent' : currentPassword.value,
      'password': password.value,
      'passwordConfirm': passwordConfirmation.value
    };

    updateMyPassword(user);
};

const store = useStore();

const updateMyPassword = (user: UpdatePassword) => store.dispatch('auth/updateMyPassword', user);

</script>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>