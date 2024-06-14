<script lang="ts" setup>

withDefaults(defineProps<{
    list: Array<string>,
    title?: string
}>(), {
    title: 'My About Card',
});

</script>

<template>
  <h2>{{ title }}</h2>
  <ul>
    <li
      v-for="item in list"
      :key="`key.${item}`"
    >
      <p>{{ item }}</p>
    </li>
  </ul>
</template>