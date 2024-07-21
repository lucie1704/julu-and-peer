<script lang="ts" setup>
import { Category } from '~/dto';

const searchGenres = defineModel<Array<string>>('searchGenres');
const searchFormats = defineModel<Array<string>>('searchFormats');

defineProps<{
  sortOptions: Array<Record<string, string>>;
  genres?: Array<Category>,
  formats?: Array<Category>,
}>();
</script>

<template>
  <form>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          variant="outlined"
          v-bind="props"
          prepend-icon="fa-solid fa-filter"
          block
        >
          Trier par
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in sortOptions"
          :key="`sortByOption.${index}`"
          :value="option.value"
        >
          <v-list-item-title>{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="border-b border-gray-200">
      <!-- Filter by genre-->
      <h3 class="font-weight-bold py-5">
        Genres
      </h3>
      <div class="space-y-4 pb-5">
        <div
          v-for="genre in genres"
          :key="`genre.${genre.name}`"
          class="flex items-center"
        >
          <input
            :id="'filter-genre-' + genre.id"
            v-model="searchGenres"
            :value="genre.name"
            type="checkbox"
            class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <label
            :for="'filter-genre-' + genre.id"
            class="ml-3 text-sm text-gray-600"
          >{{ genre.name }}</label>
        </div>
      </div>
    </div>

    <!-- Filter by format-->
    <div class="border-b border-gray-200">
      <h3 class="font-weight-bold py-5">
        Formats
      </h3>
      <div class="space-y-4 pb-5">
        <div
          v-for="format in formats"
          :key="`genre.${format.name}`"
          class="flex items-center"
        >
          <input
            :id="'filter-format-' + format.id"
            v-model="searchFormats"
            :value="format.name"
            type="checkbox"
            class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <label
            :for="'filter-format-' + format.id"
            class="ml-3 text-sm text-gray-800"
          >{{ format.name }}</label>
        </div>
      </div>
    </div>
  </form>
</template>