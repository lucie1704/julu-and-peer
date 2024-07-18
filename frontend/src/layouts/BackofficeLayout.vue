<template>
  <v-app-bar
    title="Julu & Peer Admin"
    color="gray"
  >
    <div class="p-4 space-y-4">
      <router-link
        to="/admin/productartists"
        class="bg-white rounded shadow"
      >
        Artistes
      </router-link>
      <router-link
        to="/admin/orders"
        class="bg-white rounded shadow"
      >
        Commandes
      </router-link>
      <router-link
        to="/admin"
        class="bg-white rounded shadow"
      >
        Dashboard
      </router-link>
      <router-link
        to="/admin/productformats"
        class="bg-white rounded shadow"
      >
        Formats
      </router-link>
      <router-link
        to="/admin/productgenres"
        class="bg-white rounded shadow"
      >
        Genres
      </router-link>
      <router-link
        to="/admin/products"
        class="bg-white rounded shadow"
      >
        Produits
      </router-link>
      <router-link
        to="/admin/users"
        class="bg-white rounded shadow"
      >
        Utilisateurs
      </router-link>
    </div>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
  <v-footer
    app
    color="blue"
    class="d-flex flex-column"
  >
    <div class="text-center w-100">
      {{ new Date().getFullYear() }} — <strong>ESGI</strong>
    </div>
  </v-footer>
</template>
