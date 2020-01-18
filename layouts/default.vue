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
        <v-btn dark>
          <span>Início</span>
          <v-icon>{{ mdiHomeOutline }}</v-icon>
        </v-btn>
        <v-btn dark>
          <span>text</span>
          <v-icon>{{ mdiMovie }}</v-icon>
        </v-btn>
        <v-btn dark>
          <span>text</span>
          <v-icon>{{ mdiMovie }}</v-icon>
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
import { mdiHomeOutline, mdiMovie, mdiMenu } from "@mdi/js";
export default {
  data() {
    return {
      drawer: true,
      mdiHomeOutline,
      mdiMovie,
      mdiMenu
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
