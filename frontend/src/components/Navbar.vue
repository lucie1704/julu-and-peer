
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

              <router-link to="/promotions">
                Promotions
              </router-link>

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
                <span class="sr-only">Julu&Peer</span>
                <router-link to="/">
                  <img
                    class="h-16 w-auto"
                    src="../../public/logo-julu-and-peer.png"
                    alt="Logo Julu&Peer"
                  >
                </router-link>
              </a>
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