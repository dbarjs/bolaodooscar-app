<template>
  <span v-if="votes">{{ votes }}</span>
</template>

<script>
import { votesRef } from "~/firebase";
export default {
  data() {
    return {
      votes: false
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        if (this.user) {
          this.$bind("votes", votesRef.where("userId", "==", this.user.uid));
        }
      }
    }
  }
};
</script>

<style>
</style>