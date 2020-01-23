<template>
  <v-app dark class="app">
    <nuxt />
    <v-navigation-drawer app right fixed clipped v-model="drawer">
      <user-auth></user-auth>
    </v-navigation-drawer>
    <v-footer app>
      <v-bottom-navigation
        app
        fixed
        value="value"
        active.sync="value"
        color="primary"
      >
        <v-btn to="/" dark>
          <span>Início</span>
          <v-icon>{{ mdiHome }}</v-icon>
        </v-btn>
        <v-btn to="/" dark>
          <span>Filmes</span>
          <v-icon>{{ mdiMovie }}</v-icon>
        </v-btn>
        <v-btn to="/votes" dark>
          <span>Apostas</span>
          <v-icon>{{ mdiCheckboxMultipleMarked }}</v-icon>
        </v-btn>
        <v-btn dark @click="drawer = !drawer">
          <span>Mais</span>
          <v-icon>{{ mdiMenu }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import UserAuth from "~/components/UserAuth.vue";
import { mdiHome, mdiMovie, mdiMenu, mdiCheckboxMultipleMarked } from "@mdi/js";
export default {
  data() {
    return {
      drawer: false,
      mdiHome,
      mdiMovie,
      mdiMenu,
      mdiCheckboxMultipleMarked
    };
  },
  components: {
    UserAuth
  }
};
</script>

<style>
.app.theme--dark {
  background-color: #212121;
}

.v-footer--absolute,
.v-footer--fixed {
  z-index: 7;
}
</style>
