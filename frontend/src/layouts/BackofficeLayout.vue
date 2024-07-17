<template>
  <v-app-bar
    title="Julu & Peer Admin"
    color="gray"
  >
    <router-link to="/admin/productartists">
      Artistes
    </router-link>
    <router-link to="/admin/orders">
      Commandes
    </router-link>
    <router-link to="/admin">
      Dashboard
    </router-link>
    <router-link to="/admin/productformats">
      Formats
    </router-link>
    <router-link to="/admin/productgenres">
      Genres
    </router-link>
    <router-link to="/admin/products">
      Produits
    </router-link>
    <router-link to="/admin/users">
      Utilisateurs
    </router-link>
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
