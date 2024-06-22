<template>
  <h2>HomeView</h2>
  <button @click="goToAbout">
    Go to login
  </button>
</template>

<script setup lang="ts">
import router from '../routes/router';

    const goToAbout = () => {
      router.push('/login');
    };

</script>

