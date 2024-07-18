
<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import { useAuth } from '~/stores/auth';

const authStore = useAuth();

const open = ref(false);
const cartTotalProductCount = ref<number>(0);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const logout = () => authStore.logout();

const navigation = {
  categories: [
    {
      id: 'promotions',
      name: 'Promotions',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.'
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.'
        }
      ],
      sections: []
    },
    {
      id: 'genres',
      name: 'Genres',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.'
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
        }
      ],
      sections: [
        { id: 'pop-americain', name: 'Pop Américain', items: [] },
        { id: 'urban', name: 'Urban', items: [] },
        { id: 'pop-francaise', name: 'Pop Française', items: [] },
        { id: 'variete-francaise', name: 'Variété française', items: [] },
        { id: 'rock', name: 'Rock', items: [] },
        { id: 'metal', name: 'Métal', items: [] },
        { id: 'soul', name: 'Soul', items: [] },
        { id: 'rnb', name: 'RNB', items: [] },
        { id: 'bandes-originales', name: 'Bandes Originales', items: [] },
        { id: 'reggae', name: 'Reggae', items: [] },
        { id: 'jazz', name: 'Jazz', items: [] },
        { id: 'classique', name: 'Classique', items: [] },
        { id: 'rumba', name: 'Rumba', items: [] },
        { id: 'electrique', name: 'Électrique', items: [] }
      ]
    },
    {
      id: 'formats',
      name: 'Formats',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.'
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.'
        }
      ],
      sections: [
        { id: 'picture', name: 'Picture', items: [] },
        { id: 'couleurs', name: 'Couleurs', items: [] },
        { id: 'collector', name: 'Collector', items: [] },
        {
          id: 'collections',
          name: 'Collections',
          items: [
            { id: 'festivals', name: 'Festivals', href: '#' },
            { id: 'classiques', name: 'Classiques', href: '#' },
            { id: '90s', name: '90\'S', href: '#' },
            { id: 'bons-affaires', name: 'Bons affaires', href: '#' },
            { id: 'vinyles-rares', name: 'Vinyles-rares', href: '#' }
          ]
        }
      ]
    }
  ]
};
</script>

<template>
  <div class="bg-white">
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        class="relative z-40 lg:hidden"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <TabGroup
                as="div"
                class="mt-2"
              >
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                      as="template"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :src="item.imageSrc"
                            :alt="item.imageAlt"
                            class="object-cover object-center"
                          >
                        </div>
                        <a
                          :href="item.href"
                          class="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            class="absolute inset-0 z-10"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </a>
                        <p
                          aria-hidden="true"
                          class="mt-1"
                        >
                          Shop now
                        </p>
                      </div>
                    </div>
                    <div
                      v-for="section in category.sections"
                      :key="section.name"
                    >
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-900"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        role="list"
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                      >
                        <li
                          v-for="item in section.items"
                          :key="item.name"
                          class="flow-root"
                        >
                          <a
                            :href="item.href"
                            class="-m-2 block p-2 text-gray-500"
                          >{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a
                    href="#"
                    class="-m-2 block p-2 font-medium text-gray-900"
                  >Sign in</a>
                </div>
                <div class="flow-root">
                  <a
                    href="#"
                    class="-m-2 block p-2 font-medium text-gray-900"
                  >Create account</a>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a
                  href="#"
                  class="-m-2 flex items-center p-2"
                >
                  <img
                    src="../../public/logo-julu-and-peer.png"
                    alt="logo Julu&Peer"
                    class="block h-auto w-5 flex-shrink-0"
                  >
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <nav
        aria-label="Top"
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              @click="open = true"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>

            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <router-link to="/products">
                  <img
                    class="h-8 w-auto"
                    src="../../public/logo-julu-and-peer.png"
                    alt=""
                  >
                </router-link>
              </a>
              <p class="text-xl font-extrabold ml-4">
                Julu&Peer
              </p>
            </div>
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  v-slot="{ openPop }"
                  class="flex"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        openPop
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                      ]"
                    >
                      {{ category.name }}
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel
                      class="absolute inset-x-0 top-full text-sm text-gray-500"
                    >
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                                >
                                  <img
                                    :src="item.imageSrc"
                                    :alt="item.imageAlt"
                                    class="object-cover object-center"
                                  >
                                </div>
                                <a
                                  :href="item.href"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    class="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {{ item.name }}
                                </a>
                                <p
                                  aria-hidden="true"
                                  class="mt-1"
                                >
                                  Shop now
                                </p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                            >
                              <div
                                v-for="section in category.sections"
                                :key="section.name"
                              >
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-900"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  role="list"
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in section.items"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a
                                      :href="item.href"
                                      class="hover:text-gray-800"
                                    >{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </div>
            </PopoverGroup>

            <div class="flex-grow flex justify-center">
              <div class="relative">
                <input
                  id="search"
                  name="search"
                  class="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  placeholder="Search"
                  type="search"
                >
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <router-link
                  v-if="!isAuthenticated"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  to="/login"
                >
                  Login
                </router-link>
                <span
                  class="h-6 w-px bg-gray-200"
                  aria-hidden="true"
                />
                <router-link
                  v-if="!isAuthenticated"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  to="/signup"
                >
                  Signup
                </router-link>
                <router-link
                  v-if="isAuthenticated"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  to="/signup"
                  @click="logout"
                >
                  Logout
                </router-link>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  class="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <div class="ml-4 flow-root lg:ml-6">
                <router-link
                  class="group -m-2 flex items-center p-2"
                  to="/customer/shopping-cart"
                >
                  <ShoppingBagIcon
                    class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span
                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                  >{{ cartTotalProductCount }}</span>
                  <span class="sr-only">items in cart, view bag</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <div class="bg-gray-800 text-white p-2" />
</template>