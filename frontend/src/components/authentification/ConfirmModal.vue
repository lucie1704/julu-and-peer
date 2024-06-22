<template>
  <div class="fixed inset-0 overflow-y-auto mt-16">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block">
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-4xl font-medium text-gray-900 m-4">
            Hey {{ userName }}
          </h3>
          <p class="text-xl text-gray-500">
            {{ message }}
          </p>
        </div>
        <div class="flex justify-center m-4">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="closeModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '../../routes/router';

const store = useStore();

const userName = computed(() => store.getters['auth/getUserName']);
const message = computed(() => store.getters['auth/getMessage']);

const closeModal = () => {
    router.push('/');
  };

</script>