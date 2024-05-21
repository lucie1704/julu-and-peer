<template>
  <v-app-bar title="Julu & Peer">
    <router-link to="/about">
      About
    </router-link>    
    <router-link to="/">
      Home
    </router-link>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
  <v-footer
    app
    color="green"
    class="d-flex flex-column"
  >
    <div class="text-center w-100">
      {{ new Date().getFullYear() }} — <strong>ESGI</strong>
    </div>
  </v-footer>
</template>