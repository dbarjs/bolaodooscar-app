<template>
  <v-app-bar transition="slide-y-transition" fixed v-model="isVoting">
    <v-btn icon @click="clearChoices">
      <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ numberOfVotes }} / {{ numberOfCategories }} votos
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="success" @click="confirmVote">Votar</v-btn>
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
import { mdiArrowLeft } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiArrowLeft }
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isVoting() {
      return !!Object.keys(this.$store.state.currentChoices).length;
    },
    numberOfVotes() {
      return Object.keys(this.$store.state.currentChoices).length;
    },
    numberOfCategories() {
      return this.$store.getters["categories/getCategoryList"].length;
    }
  },
  methods: {
    confirmVote() {
      if (this.user) {
        const currentChoices = this.$store.state.currentChoices;
        const choices = [];
        Object.keys(currentChoices).forEach(choiceKey => {
          choices.push({
            ...currentChoices[choiceKey],
            movie: moviesRef.doc(currentChoices[choiceKey].movieId),
            category: categoriesRef.doc(currentChoices[choiceKey].categoryId)
          });
        });
        votesRef.add({
          userId: this.user.uid,
          user: usersRef.doc(this.user.uid),
          timestamp: Timestamp.now(),
          choices
        });
        console.log(choices);
        this.$store.commit("clearCurrentChoices");
      }
    },
    clearChoices() {
      this.$store.commit("clearCurrentChoices");
    }
  }
};
</script>

<style></style>
