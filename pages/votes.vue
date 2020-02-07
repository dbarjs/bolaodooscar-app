<template>
  <div>
    <vote-list v-if="user"></vote-list>
  </div>
</template>

<script>
import VoteList from "~/components/VoteList.vue";
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  components: {
    VoteList
  }
};
</script>

<style>
</style>