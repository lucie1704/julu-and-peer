<template>
  <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
    <div class="text-gray-500 text-lg mb-4">
      See you soon !!!
    </div>
    <div class="text-3xl font-bold mb-4">
      Reset Password
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900"
        >Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="your email"
          required
        >
        <small
          v-if="emailError"
          class="error"
        >{{ emailError }}</small>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block mx-auto"
      >
        Submit
      </button>
    </form>
    <div class="text-gray-500 text-sm text-center mt-8">
      I don’t have an account ?
      <router-link
        class="btn"
        to="/signup"
      >
        <a
          href="#"
          class="text-blue-500 text-sm mt-1"
        > Sign up !</a>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
//@ts-ignore
import { useStore } from 'vuex';
import { UserEmail } from '../../dto/UserEmail';
import { emailSchema } from '../../validation/login';

const email = ref('');

const emailError = computed(() => {
  const parsedEmail = emailSchema.safeParse(email.value);

  if (parsedEmail.success) {
    return '';
  }

  return parsedEmail.error.issues[0].message;
});

const submitForm = () => {
  if (emailError.value ) return console.log('Form validation failed!');

  forgotPassword({ 'email':  email.value });
};

const store = useStore();

const forgotPassword = (email) => store.dispatch('auth/forgotPassword', email);

</script>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>