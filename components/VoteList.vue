<template>
  <v-container v-if="votes">
    <v-row>
      <vote-list-item
        v-for="vote in votes"
        :key="vote.id"
        :voteId="vote.id"
      ></vote-list-item>
    </v-row>
  </v-container>
</template>

<script>
import { votesRef } from "~/firebase";
import VoteListItem from "~/components/VoteListItem.vue";
export default {
  data() {
    return {
      votes: false
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    orderedChoices() {
      const orderedChoices = this.choices;
      console.log(orderedChoices);
      return this.votes;
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (this.user) {
          this.$bind(
            "votes",
            votesRef
              .where("userId", "==", this.user.uid)
              .orderBy("updated", "desc")
          );
        }
      }
    }
  },
  components: {
    VoteListItem
  }
};
</script>

<style></style>
