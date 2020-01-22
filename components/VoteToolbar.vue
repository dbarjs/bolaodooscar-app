<template>
  <v-app-bar transition="slide-y-transition" fixed v-model="isVoting">
    <v-btn icon>
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ numberOfVotes }} / {{ numberOfCategories }} votos
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="success" @click="confirmVote">Votar</v-btn>
  </v-app-bar>
</template>

<script>
import { votesRef } from "~/firebase";
import { mdiArrowLeft } from "@mdi/js";
export default {
  data() {
    return {
      mdiArrowLeft
    };
  },
  computed: {
    isVoting() {
      return !!Object.keys(this.$store.state.currentVote).length;
    },
    numberOfVotes() {
      return Object.keys(this.$store.state.currentVote).length;
    },
    numberOfCategories() {
      return this.$store.getters["categories/getCategoryList"].length;
    }
  },
  methods: {
    confirmVote() {
      console.log(this.$store.state.currentVote);
      votesRef.add(this.$store.state.currentVote);
    }
  }
};
</script>

<style></style>
