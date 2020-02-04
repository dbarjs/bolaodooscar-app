<template>
  <div class="pt-4">
    <header>
      <v-container class="d-flex flex-column align-center">
        <v-img class="logo" src="bdo-logo.png" max-width="300"></v-img>
        <p class="subtitle-1 text-center my-4">
          Organize suas apostas e compartilhe!
        </p>
        <v-btn
          color="my-6 success"
          v-if="user && numberOfVotes <= 1"
          @click="createVote"
        >
          Faça sua Aposta!
        </v-btn>
        <user-sign-in></user-sign-in>
      </v-container>
    </header>
    <vote-list v-if="user"></vote-list>
    <v-fab-transition>
      <v-btn
        color="success"
        fab
        large
        dark
        fixed
        right
        bottom
        class="v-btn--example"
        v-if="user"
        @click="createVote"
      >
        <v-icon>{{ icons.mdiPlus }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import UserSignIn from "~/components/UserSignIn.vue";
import VoteList from "~/components/VoteList.vue";
import { mdiPlus } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiPlus
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isAuthStateVerified() {
      return this.$store.getters["user/isAuthStateVerified"];
    },
    numberOfVotes() {
      return this.$store.state.numberOfVotes;
    }
  },
  methods: {
    createVote() {
      this.$store.dispatch("vote/createVote").then(voteRef => {
        this.$router.push("/vote/" + voteRef.id);
      });
    }
  },
  components: {
    UserSignIn,
    VoteList
  },
  transition: "page"
};
</script>

<style scoped>
.page-enter-active {
  animation: acrossIn 1s ease-in;
}
.page-leave-active {
  animation: acrossOut 1s ease-out;
}
@keyframes acrossIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes acrossOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
