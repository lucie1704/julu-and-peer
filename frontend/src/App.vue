<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
//@ts-ignore
import NavBar from "./components/Navbar.vue"
import ProductLists from "./components/product/ProductLists.vue";

</script>
