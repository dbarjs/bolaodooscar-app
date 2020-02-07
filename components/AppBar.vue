<template>
  <v-app-bar app color="#212121" elevate-on-scroll>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
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
</template>

<script>
import { mdiArrowLeft, mdiGithubCircle, mdiTwitter } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiGithubCircle,
        mdiTwitter
      }
    };
  },
  computed: {
    pageTitle() {
      switch (this.$route.name) {
        case "votes":
          return "Minhas Apostas";
          break;
        case "index":
          return "Bolão do Oscar";
          break;
        default:
          return "Bolão do Oscar";
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    backToPreviousPage() {
      this.$router.back();
    }
  }
};
</script>

<style>
</style>