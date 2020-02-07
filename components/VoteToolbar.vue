<template>
  <v-app-bar
    app
    transition="slide-y-transition"
    color="#212121"
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
    <v-btn icon @click.stop="clearChoices">
      <v-icon icon dark>{{ icons.mdiPlaylistRemove }}</v-icon>
    </v-btn>
    <v-btn icon @click="shareVote">
      <v-icon icon dark>{{ icons.mdiShare }}</v-icon>
    </v-btn>
    <clear-choices-dialog></clear-choices-dialog>
    <share-dialog></share-dialog>
  </v-app-bar>
</template>

<script>
import ClearChoicesDialog from "~/components/ClearChoicesDialog.vue";
import ShareDialog from "~/components/ShareDialog.vue";
import {
  votesRef,
  usersRef,
  categoriesRef,
  moviesRef,
  Timestamp
} from "~/firebase";
import { mdiArrowLeft, mdiShare, mdiPlaylistRemove } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiArrowLeft, mdiShare, mdiPlaylistRemove }
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
    },
    currentVoteId() {
      return this.$store.getters["vote/getCurrentVoteId"];
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
      this.$store.commit("setClearChoicesDialog", true);
    },
    shareVote() {
      this.$store.dispatch("vote/shareVote");
    }
  },
  components: {
    ClearChoicesDialog,
    ShareDialog
  }
};
</script>

<style></style>
