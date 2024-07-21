<script lang="ts" setup>
import { ref } from 'vue';
import { Category } from '~/dto';
import { useProduct } from '~/stores/product';

const productStore = useProduct();

const selectedSort = defineModel<Record<string, string>>('selectedSort');
const searchGenres = defineModel<Array<string>>('searchGenres');
const searchFormats = defineModel<Array<string>>('searchFormats');
const searchDiscount = defineModel<boolean>('searchDiscount');

defineProps<{
  sortOptions: Array<Record<string, string>>;
  genres?: Array<Category>,
  formats?: Array<Category>,
}>();

const panels = ref(['genres', 'formats']);

const getCategoryCount = (category: string, name: string): number => {
  const categoryItem = productStore.paginatedProducts?.facets[category]?.find(category => category._id === name);
  return categoryItem ? categoryItem.count : 0;
};

</script>

<template>
  <form>
    <v-row class="px-3">
      <v-col>
        <label
          for="sortBy"
          class="font-weight-bold flex justify-between align-center mx-3"
        >
          Trier par
          <v-icon
            icon="fas fa-filter"
            size="small"
          />
        </label>
        <v-select
          id="sortBy"
          v-model="selectedSort"
          :items="sortOptions"
          return-object
          menu-icon="fas fa-angle-down"
          class="pt-3"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row class="px-6">
      <v-col>
        <div class="flex items-center">
          <input
            id="discount"
            v-model="searchDiscount"
            :value="searchDiscount"
            type="checkbox"
            class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          >
          <label
            for="discount"
            class="ml-3 text-sm text-gray-800"
          >
            Promotions
            <v-badge
              color="grey lighten-3"
              :content="productStore.paginatedProducts?.facets['discount'][0] ? productStore.paginatedProducts?.facets['discount'][0].count :0"
              inline
            />
          </label>
        </div>
      </v-col>
    </v-row>

    <v-expansion-panels
      v-model="panels"
      multiple
      expand-icon="fas fa-angle-down"
      collapse-icon="fas fa-angle-up"
      flat
    >
      <!-- Filter by genre-->
      <v-expansion-panel value="genres">
        <v-expansion-panel-title class="font-bold">
          Genres
        </v-expansion-panel-title>
        <v-expansion-panel-text>
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
              >
                {{ genre.name }}
                <v-badge
                  color="grey lighten-3"
                  :content="getCategoryCount('genres', genre.name)"
                  inline
                />
              </label>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel value="formats">
        <v-expansion-panel-title class="font-bold">
          Formats
        </v-expansion-panel-title>

        <v-expansion-panel-text>
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
              >
                {{ format.name }}
                <v-badge
                  color="grey lighten-3"
                  :content="getCategoryCount('formats', format.name)"
                  inline
                />
              </label>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </form>
</template>