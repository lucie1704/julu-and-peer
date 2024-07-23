<script lang="ts" setup>
const navItems = [
  {
    title: 'Dashboard',
    path: ''
  },
  {
    title: 'Commandes',
    path: 'orders'
  },
  {
    title: 'Utilisateurs',
    path: 'users'
  },
  {
    title: 'Vinyles',
    path: 'products'
  },
  {
    title: 'Artistes',
    path: 'productartists'
  },
  {
    title: 'Genres',
    path: 'productgenres'
  },
  {
    title: 'Formats',
    path: 'productformats'
  }
];

</script>

<template>
  <v-app-bar
    color="blue"
    :height="90"
    flat
    scroll-behavior="hide"
  >
    <v-container class="text-gray-800">
      <v-row>
        <v-col class="flex align-center items-center">
          <router-link to="/admin">
            <img
              class="h-16 w-auto"
              src="../../public/logo-julu-and-peer.png"
              alt="Logo Julu&Peer"
            >
          </router-link>

          <h1 class="font-bold text-black text-h5 ml-6">
            ADMIN
          </h1>

          <v-spacer />
          <div
            v-for="navItem in navItems"
            :key="`navItem${navItem.path}`"
            class="p-4 flex text-gray-800 space-y-10"
          >
            <router-link
              :to="`/admin/${navItem.path}`"
              active-class="underline underline-offset-8"
              class="flex items-center font-bold hover:underline hover:underline-offset-8 active:text-black"
            >
              {{ navItem.title }}
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
  <div
    class="w-full mt-10 bg-blue d-flex flex-column pa-6"
  >
    <div class="text-center text-white w-100 pa-3">
      {{ new Date().getFullYear() }} — <strong>ESGI</strong>
    </div>
  </div>
</template>
