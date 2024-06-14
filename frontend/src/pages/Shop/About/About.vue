<route lang="yaml">
  path: /about
  name: about
  meta:
    layout: AppLayout
</route>

<script lang="ts" setup>
import { MyAboutList } from './components';
</script>

<template>
  <div class="about">
    <my-about-list
      :list="['hello', 'Pedro']"
      title="toto"
    />
    <h1 class="text-center">
      This is an about page
    </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
