<template>
  <v-app-bar
    transition="slide-y-transition"
    v-model="isVoting"
    color="#212121"
    fixed
    elevate-on-scroll
  >
    <v-btn icon @click="setCurrentVote">
      <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-toolbar-title>
      <span v-if="numberOfVotes">
        {{ numberOfVotes }} / {{ numberOfCategories }} votos
      </span>
      <span v-else>Indicados</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="clearChoices">
      <v-icon icon dark>{{ icons.mdiPlaylistRemove }}</v-icon>
    </v-btn>
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
import { mdiArrowLeft, mdiShareVariant, mdiPlaylistRemove } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiArrowLeft, mdiShareVariant, mdiPlaylistRemove }
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
    setCurrentVote() {
      // this delay prevents the ui don't update until the page is changed
      setTimeout(() => {
        this.$store.dispatch("vote/unbindVoteRef");
      }, 500);
      this.$router.push("/");
    },
    clearChoices() {
      this.$store.dispatch("vote/clearChoices");
    },
    shareVote() {}
  }
};
</script>

<style></style>
