<template>
  <div class="pt-12" v-if="isAuthStateVerified">
    <header>
      <v-container class="d-flex flex-column align-center">
        <v-img class="logo" src="bdo-logo.png" max-width="300"></v-img>
        <v-btn color="my-6 success" v-if="user" @click="createVote">
          Faça sua Aposta!
        </v-btn>
      </v-container>
    </header>
    <vote-list v-if="user"></vote-list>
  </div>
</template>

<script>
import VoteList from "~/components/VoteList.vue";
export default {
  transition: "page",
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isAuthStateVerified() {
      return this.$store.getters["user/isAuthStateVerified"];
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
    VoteList
  }
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
