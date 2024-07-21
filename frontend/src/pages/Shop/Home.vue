<route lang="yaml">
path: /
name: home
meta:
  layout: AppLayout
</route>

<script setup lang="ts">
import debounce from 'lodash/debounce';
import { onMounted, ref, watch } from 'vue';
import formatAPI from '~/api/format';
import genreAPI from '~/api/genre';
import { ProductFilter, ProductItem } from '~/components';
import { Category } from '~/dto';
import { useProduct } from '~/stores/product';

const productStore = useProduct();

const productsPage = ref(productStore.paginatedProducts?.page);
const genreItems = ref<Array<Category>>();
const formatItems = ref<Array<Category>>();
const filterDrawer = ref<boolean>(false);

const urlParams = new URLSearchParams(window.location.search);

const searchTerms = ref<string>(urlParams.get('search') || '');
const searchGenres = ref<Array<string>>(urlParams.get('genres')?.split(',') || []);
const searchFormats = ref<Array<string>>(urlParams.get('formats')?.split(',') || []);
const searchDiscount = ref<boolean>(Boolean(urlParams.get('discount')));

const sortByOptions = [
  {
    title: 'Nouveau',
    value: 'new'
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

const selectedSort = ref<Record<string, string>>(
  sortByOptions.find(option => option.value === urlParams.get('sort')) || sortByOptions[0]);

onMounted(async() => {
  try {
    const genresResponse = await genreAPI.getAllProductGenres();
    genreItems.value = genresResponse.data;
    const formatsResponse = await formatAPI.getAllProductFormats();
    formatItems.value = formatsResponse.data;

  } catch (error) {
    console.error('Error fetching product genres and formats:', error);
  }
});

const fetchProducts = async (query?: string) => {
  try {
    if (query && query.length > 0) {
      await productStore.fetchAllProducts(query);
    } else {
      await productStore.fetchAllProducts();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const buildSearchQuery = (): string | undefined => {
  let concatQuery = [];

  if (searchTerms.value) concatQuery.push(`search=${searchTerms.value}`);

  if (searchGenres.value.length > 0) {
    concatQuery.push(`genres=${searchGenres.value.join(',')}`);
  }

  if (searchFormats.value.length > 0) {
    concatQuery.push(`formats=${searchFormats.value.join(',')}`);
  }

  if (searchDiscount.value) concatQuery.push('discount=true');

  concatQuery.push(`sort=${selectedSort.value.value}`);

  return concatQuery.length > 0 ? ('?' + concatQuery.join('&')) : undefined;
};

const debouncedFetchProducts = debounce(fetchProducts, 300);

const updateUrlWithQuery = (query: string) => {
  window.history.pushState(null, '', query);
};

const updatePage = () => {
  let queryString = buildSearchQuery();
  queryString = queryString
    ? (queryString + `&page=${productsPage.value}`)
    : `?page=${productsPage.value}`;

  if (queryString) updateUrlWithQuery(queryString);
  debouncedFetchProducts(queryString);
};

watch([searchTerms, searchGenres, searchFormats, selectedSort, searchDiscount], () => {
  const queryString = buildSearchQuery();
  if (queryString) updateUrlWithQuery(queryString);
  debouncedFetchProducts(queryString);
});

const initialQueryString = buildSearchQuery();
fetchProducts(initialQueryString);
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <v-container class="my-3">
      <v-row>
        <v-col offset-md="3">
          <div class="max-w-lg mt-3 lg:ml-6">
            <div class="relative flex items-center border-2 border-gray-800 rounded-pill w-full h-12 rounded-lg bg-white overflow-hidden">
              <div class="ml-2 grid place-items-center h-full w-12 text-gray-800">
                <v-icon
                  size="small"
                  icon="fas fa-search"
                />
              </div>

              <input
                id="search"
                v-model="searchTerms"
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                placeholder="Rechercher un vinyle..."
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Filter btn for mobile -->
      <v-row>
        <v-col
          cols="12"
          class="lg:hidden"
        >
          <v-btn
            block
            variant="outlined"
            @click.stop="filterDrawer = !filterDrawer"
          >
            Filtrer par
          </v-btn>
        </v-col>

        <v-col
          cols="3"
          class="hidden lg:block mr-6"
        >
          <product-filter
            v-model:selected-sort="selectedSort"
            v-model:search-genres="searchGenres"
            v-model:search-formats="searchFormats"
            v-model:search-discount="searchDiscount"
            class="border rounded-lg py-6 px-3"
            :sort-options="sortByOptions"
            :genres="genreItems"
            :formats="formatItems"
          />
        </v-col>

        <!-- Product grid -->
        <v-col>
          <v-row
            v-if="productStore.paginatedProducts?.totalItems"
            no-gutters
          >
            <v-col>
              {{ productStore.paginatedProducts?.totalItems }} résultat{{ productStore.paginatedProducts?.totalItems > 1 ? 's' : '' }}
            </v-col>
          </v-row>
          <v-row v-if="productStore.products && productStore.products.length > 0">
            <v-col
              v-for="product in productStore.products"
              :key="`vinyle.${product._id}`"
              sm="6"
              md="4"
            >
              <product-item :product="product" />
            </v-col>
            <v-col cols="12">
              <v-pagination
                v-model="productsPage"
                size="small"
                rounded
                active-color="blue"
                :length="productStore.paginatedProducts?.totalPages"
                :total-visible="4"
                variant="outlined"
                next-icon="fas fa-angle-right"
                prev-icon="fas fa-angle-left"
                @update:model-value="updatePage"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              Aucun vinyle ne correspond à votre recherche
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </main>

  <!-- Mobile filter rnavigation -->
  <v-navigation-drawer
    v-model="filterDrawer"
    temporary
    location="right"
  >
    <v-container>
      <v-row>
        <v-col>
          <product-filter
            v-model:selected-sort="selectedSort"
            v-model:search-genres="searchGenres"
            v-model:search-formats="searchFormats"
            v-model:search-discount="searchDiscount"
            :sort-options="sortByOptions"
            :genres="genreItems"
            :formats="formatItems"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>
