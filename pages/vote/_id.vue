<template>
  <div class="vote-page">
    <category-list></category-list>
  </div>
</template>

<script>
import CategoryList from "~/components/CategoryList.vue";
import { votesRef } from "~/firebase";
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    voteId() {
      return this.$store.state.vote.currentVote
        ? this.$store.state.vote.currentVote.id
        : false;
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        if (this.id) {
          this.$store.dispatch("vote/bindVoteRef", this.id);
        } else {
          this.$store.dispatch("vote/createVote").then(voteRef => {
            this.$router.push("/vote/" + voteRef.id);
          });
        }
      }
    }
  },
  components: {
    CategoryList
  }
};
</script>

<style>
.vote-page {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}
</style>

<style scoped>
.page-enter-active {
  animation: acrossIn 1s ease-in;
}
.page-leave-active {
  animation: acrossOut 0.5s ease-out;
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