<template>
  <v-app dark class="app" v-resize="onResize">
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
        <v-list-item to="/about" dark>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiInformation }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <span>Sobre</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider v-if="user"></v-divider>
      <user-menu></user-menu>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import UserInfo from "~/components/UserInfo.vue";
import UserMenu from "~/components/UserMenu.vue";
import UserSignIn from "~/components/UserSignIn.vue";
import {
  mdiHome,
  mdiMovie,
  mdiMenu,
  mdiGithubCircle,
  mdiTwitter,
  mdiInformation
} from "@mdi/js";
export default {
  data() {
    return {
      drawer: false,
      icons: {
        mdiHome,
        mdiMovie,
        mdiMenu,
        mdiGithubCircle,
        mdiTwitter,
        mdiInformation
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isMobile() {
      return this.$store.state.windowSize.x <= 600;
    },
    windowSize() {
      return this.$store.state.windowSize;
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
  components: {
    UserInfo,
    UserMenu,
    UserSignIn
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
