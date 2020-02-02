<template>
  <v-app-bar
    transition="slide-y-transition"
    v-model="isVoting"
    color="#212121"
    fixed
    elevate-on-scroll
  >
    <v-btn icon @click="clearChoices">
      <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-toolbar-title class="">
      {{ numberOfVotes }} / {{ numberOfCategories }} votos
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="shareVote">
      <v-icon icon dark>{{ icons.mdiShareVariant }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {
  votesRef,
  usersRef,
  categoriesRef,
  moviesRef,
  Timestamp
} from "~/firebase";
import { mdiArrowLeft, mdiShareVariant } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiArrowLeft, mdiShareVariant }
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isVoting() {
      return !!this.$store.state.vote;
    },
    numberOfVotes() {
      return Object.keys(this.$store.getters["vote/getChoices"]).length;
    },
    numberOfCategories() {
      return this.$store.getters["categories/getCategoryList"].length;
    }
  },
  methods: {
    clearChoices() {
      this.$store.dispatch("vote/clearChoices");
    },
    shareVote() {}
  }
};
</script>

<style></style>
