<template>
  <v-app-bar transition="slide-y-transition" fixed v-model="isVoting">
    <v-btn icon>
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
import { votesRef, usersRef, Timestamp } from "~/firebase";
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
      if (this.user) {
        votesRef.add({
          userId: this.user.uid,
          user: usersRef.doc(this.user.uid),
          timestamp: Timestamp.now(),
          choices: this.$store.state.currentVote
        });
        this.$store.commit("clearCurrentVote");
      }
    }
  }
};
</script>

<style></style>
