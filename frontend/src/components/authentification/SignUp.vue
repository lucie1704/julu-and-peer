<template>
  <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
    <div class="text-gray-500 text-lg mb-4">
      Join US!!!
    </div>
    <div class="text-5xl font-bold mb-4">
      Sign up
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900"
        >FullName</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="your email"
          required
        >
        <small
          v-if="nameError"
          class="error"
        >{{ nameError }}</small>
      </div>
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
    <div class="text-gray-500 text-sm text-center mt-8">
      You already have an account ? 
      <a
        href="#"
        class="text-blue-500 text-sm mt-1"
      >
        <router-link
          class="btn"
          to="/login"
        >Login !</router-link>
      </a>
    </div>
  </div>
</template>

<!-- add: name, passwordConfirm -->
<script setup lang="ts">

import { computed, ref } from 'vue';
//@ts-ignore
import { useStore } from 'vuex';
import { SignUp } from '~/dto/signUp';
import { emailSchema, passwordSchema } from '../../validation/login';
import { nameSchema } from '../../validation/signup';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const nameError = computed(() => {
  const parsedName = nameSchema.safeParse(name.value);

  if (parsedName.success) {
    return '';
  }

  return parsedName.error.issues[0].message;
});

const emailError = computed(() => {
  const parsedEmail = emailSchema.safeParse(email.value);

  if (parsedEmail.success) {
    return '';
  }

  return parsedEmail.error.issues[0].message;
});

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

  if (nameError.value
    || emailError.value
    || passwordError.value
    || passwordConfirmationError.value) return console.log('Form validation failed!');

    const user : SignUp =  {
      'name': name.value,
      'email':  email.value,
      'password': password.value,
      'passwordConfirm': passwordConfirmation.value
    };

    signup(user);
};

const store = useStore();

const signup = (user: UserSignUp) => store.dispatch('auth/signup', user);

</script>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>