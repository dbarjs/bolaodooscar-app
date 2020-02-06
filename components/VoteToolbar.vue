<template>
  <v-app-bar
    app
    transition="slide-y-transition"
    v-model="isVoting"
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
    <clear-choices-dialog></clear-choices-dialog>
    <v-btn icon @click.stop="clearChoices">
      <v-icon icon dark>{{ icons.mdiPlaylistRemove }}</v-icon>
    </v-btn>
    <v-btn icon @click="shareVote">
      <v-icon icon dark>{{ icons.mdiShareVariant }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import ClearChoicesDialog from "~/components/ClearChoicesDialog.vue";
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
      if (this.currentVoteId) {
        const shareData = {
          title: "Bolão do Oscar",
          text: "Veja minhas apostas para o Oscar 2020!",
          url:
            "https://bolaodooscar.web.app/vote/" +
            this.$store.getters["vote/getCurrentVoteId"]
        };
        console.log(shareData);
        try {
          navigator.share(shareData);
          console.log("Deu certo");
        } catch (err) {
          console.warn("Error: " + err);
        }
      }
    }
  },
  components: {
    ClearChoicesDialog
  }
};
</script>

<style></style>
