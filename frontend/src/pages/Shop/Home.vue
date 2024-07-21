<route lang="yaml">
path: /
name: home
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import formatAPI from '~/api/format';
import genreAPI from '~/api/genre';
import { ProductItem } from '~/components';
import { Category } from '~/dto';
import { useProduct } from '~/stores/product';

const productStore = useProduct();
const genres = ref<Array<Category>>();
const formats = ref<Array<Category>>();
const sortByOptions = [{
    title: 'Nouveau',
    value: 'recent'
  },
  {
    title: 'Prix croissant',
    value: 'asc'
  },
  {
    title: 'Prix décroissant',
    value: 'desc'
  }
];

onMounted(async() => {
  try {
    const genresResponse = await genreAPI.getAllProductGenres();
    genres.value = genresResponse.data;
    const formatsResponse = await formatAPI.getAllProductFormats();
    formats.value = formatsResponse.data;

  } catch (error) {
    console.error('Error fetching product genres:', error);
  }
  productStore.fetchAllProducts();
});

</script>

<template>
  <div>
    <div>
      <div
        class="relative z-40 lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
        />

        <div class="fixed inset-0 z-40 flex">
          <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div class="flex items-center justify-between px-4">
              <h2 class="text-lg font-medium text-gray-900">
                Filters
              </h2>
              <button
                type="button"
                class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Filter by genre-->
            <form class="hidden lg:block">
              <h3 class="sr-only">
                Filtrer
              </h3>

              <div class="border-b border-gray-200">
                <h3 class="font-weight-bold pb-5">
                  Genres
                </h3>
                <div class="space-y-4 py-5">
                  <div
                    v-for="genre in genres"
                    :key="`genre.${genre.name}`"
                    class="flex items-center"
                  >
                    <input
                      id="filter-category-0"
                      name="category[]"
                      value="new-arrivals"
                      type="checkbox"
                      class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label
                      for="filter-category-0"
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
                      id="filter-category-0"
                      name="category[]"
                      value="new-arrivals"
                      type="checkbox"
                      class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label
                      for="filter-category-0"
                      class="ml-3 text-sm text-gray-600"
                    >{{ format.name }}</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        >
          <span class="sr-only">Filters</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <section
          class="pb-24 pt-6"
        >
          <h2
            id="products-heading"
            class="sr-only"
          >
            Products
          </h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mt-10">
            <form class="hidden lg:block">
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
                    v-for="(option, index) in sortByOptions"
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
                      id="filter-category-0"
                      name="category[]"
                      value="new-arrivals"
                      type="checkbox"
                      class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label
                      for="filter-category-0"
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
                      id="filter-category-0"
                      name="category[]"
                      value="new-arrivals"
                      type="checkbox"
                      class="space-y-8 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label
                      for="filter-category-0"
                      class="ml-3 text-sm text-gray-600"
                    >{{ format.name }}</label>
                  </div>
                </div>
              </div>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-4">
              <div class="flex justify-center items-center mb-16">
                <div class="w-3/5 relative">
                  <input
                    type="text"
                    placeholder="Chercher un vinyle"
                    class="w-full px-4 py-2 outline outline-black focus:outline focus:outline-black rounded-full placeholder-gray-400 pr-10"
                  >
                </div>
              </div>
              <!-- <div class="flex justify-center items-center my-12">
                <div class="w-3/5 relative">
                  <input
                    type="text"
                    placeholder="Chercher un vinyle"
                    class="w-full px-4 py-2 border border-black outline outline-black rounded-full focus:outline-none placeholder-gray-400 pr-10"
                  >
                  <v-icon
                    icon="fas fa-search"
                    class="absolute transform -translate-y-1/2 text-black"
                  />
                </div>
              </div> -->

              <div
                class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <div
                  v-if="productStore.products"
                  class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
                >
                  <div
                    v-for="product in productStore.products"
                    :key="`vinyle.${product._id}`"
                    class="group relative"
                  >
                    <product-item :product="product" />
                  </div>
                </div>
                <div v-else>
                  Aucun produit
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
