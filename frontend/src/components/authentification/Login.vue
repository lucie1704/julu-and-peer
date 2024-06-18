<template>
  <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6 mt-16">
  <div class="text-gray-500 text-lg mb-4">Welcome back !!!</div>
  <div class="text-5xl font-bold mb-4">Login</div>
  <form @submit.prevent="submitForm">
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
      <input id="email" type="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="your email" required />
      <small class="error" v-if="emailError">{{ emailError }}</small>
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
      <input id="password" type="password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      <router-link class="btn" to="/forgotPassword">
        <a href="#" class="text-blue-500 text-sm mt-1">Forgot Password?</a>
      </router-link>
      <small class="error" v-if="passwordError">{{ passwordError }}</small>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block mx-auto">Submit</button>
  </form>
  <div class="text-gray-500 text-sm text-center mt-8">
    I don’t have an account ?
    <router-link class="btn" to="/signup">
      <a href="#" class="text-blue-500 text-sm mt-1"> Sign up !</a>
    </router-link>
  </div>
</div>

</template>


<script setup lang="ts">

import { ref, computed } from 'vue'
//@ts-ignore
import { useStore } from 'vuex'
import { UserLogin } from '../../dto/login';
import { emailSchema, passwordSchema } from '../../validation/login';

const email = ref("");
const password = ref("");

const emailError = computed(() => {
  const parsedEmail = emailSchema.safeParse(email.value);

  if (parsedEmail.success) {
    return "";
  }

  return parsedEmail.error.issues[0].message;
});

const passwordError = computed(() => {
  const parsedPassword = passwordSchema.safeParse(password.value);

  if (parsedPassword.success) {
    return "";
  }

  return parsedPassword.error.issues[0].message;
});


const submitForm = () => {
  if (emailError.value && passwordError.value) return console.log('Form validation failed!');

    const user : UserLogin =  {
      "email":  email.value,
      "password": password.value,
    };

    login(user)
}

const store = useStore()

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
const login = (user: UserLogin) => store.dispatch('auth/login', user)

</script>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>