<template>
  <v-app dark class="app" v-resize="onResize">
    <app-bar v-if="routeName != 'vote-id'"></app-bar>
    <vote-toolbar v-if="routeName == 'vote-id'"></vote-toolbar>
    <v-navigation-drawer
      app
      color="#212121"
      :temporary="isMobile"
      :fixed="!isMobile"
      v-model="drawer"
    >
      <user-info></user-info>
      <user-sign-in></user-sign-in>
      <v-divider></v-divider>
      <v-list nav dense shaped>
        <v-list-item to="/" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiHome }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Início</span>
          </v-list-item-title>
        </v-list-item>
        <!-- <v-list-item to="/about" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiInformation }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Sobre</span>
          </v-list-item-title>
        </v-list-item> -->
      </v-list>
      <v-divider v-if="user"></v-divider>
      <user-menu></user-menu>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      app
      absolute
      z-index="0"
      class="text-center d-flex grey--text text--darken-1"
      elevation="0"
      inset
      color="transparent"
      style="z-index: 0"
    >
      <div>
        Projeto desenvolvido por
        <v-btn
          text
          color="grey light-1"
          class="px-0 text-lowercase"
          href="https://twitter.com/dbarjs"
          target="_blank"
        >
          @dbarjs
        </v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "~/components/AppBar.vue";
import UserInfo from "~/components/UserInfo.vue";
import UserMenu from "~/components/UserMenu.vue";
import UserSignIn from "~/components/UserSignIn.vue";
import VoteToolbar from "~/components/VoteToolbar.vue";
import { mdiHome, mdiMovie, mdiMenu, mdiInformation } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiHome,
        mdiMovie,
        mdiMenu,
        mdiInformation
      }
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("setDrawer", value);
      }
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    isMobile() {
      return this.$store.state.windowSize.x <= 600;
    },
    windowSize() {
      return this.$store.state.windowSize;
    },
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    onResize() {
      this.$store.commit("setWindowSize", {
        x: window.innerWidth,
        y: window.innerHeight
      });
    }
  },
  created() {
    // Verify if the user has logged in
    this.$store.dispatch("user/verifyAuthState");
    // Bind main Firestore collections
    this.$store.dispatch("movies/bindMoviesRef");
    this.$store.dispatch("categories/bindCategoriesRef");
  },
  mounted() {
    this.onResize();
  },
  components: {
    AppBar,
    UserInfo,
    UserMenu,
    UserSignIn,
    VoteToolbar
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
