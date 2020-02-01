<template>
  <div class="vote-page">
    <category-list></category-list>
    <!-- <vote-toolbar></vote-toolbar> -->
  </div>
</template>

<script>
import CategoryList from "~/components/CategoryList.vue";
// import VoteToolbar from "~/components/VoteToolbar.vue";
export default {
  components: {
    CategoryList
    // VoteToolbar
  }
  // transition: "page"
};
</script>

<style scoped>
</style>