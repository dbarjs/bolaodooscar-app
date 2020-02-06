<template>
  <v-app-bar app color="#212121" elevate-on-scroll>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
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
</template>

<script>
import { mdiGithubCircle, mdiTwitter } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiGithubCircle,
        mdiTwitter
      }
    };
  },
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>

<style>
</style>