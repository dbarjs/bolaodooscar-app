<template>
  <v-app dark class="app">
    <v-app-bar app color="#212121" elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Bolão do Oscar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon href="https://twitter.com/dbarjs" target="_blank">
        <v-icon>{{ icons.mdiTwitter }}</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://github.com/dbarjs/bolaodooscar-app"
        target="_blank"
      >
        <v-icon>{{ icons.mdiGithubCircle }}</v-icon>
      </v-btn>
    </v-app-bar>
    <nuxt />
    <v-navigation-drawer app color="#212121" fixed v-model="drawer">
      <user-auth></user-auth>
      <v-list nav dense shaped v-if="!showUserMenu">
        <v-list-item to="/" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiHome }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Início</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/votes" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiCheckboxMultipleMarked }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Minhas Apostas</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/about" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiInformation }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Sobre o Bolão do Oscar</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer app></v-footer> -->
  </v-app>
</template>

<script>
import UserAuth from "~/components/UserAuth.vue";
import {
  mdiHome,
  mdiMovie,
  mdiMenu,
  mdiCheckboxMultipleMarked,
  mdiGithubCircle,
  mdiTwitter,
  mdiInformation
} from "@mdi/js";
export default {
  computed: {
    showUserMenu() {
      return this.$store.state.showUserMenu;
    }
  },
  data() {
    return {
      drawer: false,
      icons: {
        mdiHome,
        mdiMovie,
        mdiMenu,
        mdiCheckboxMultipleMarked,
        mdiGithubCircle,
        mdiTwitter,
        mdiInformation
      }
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
