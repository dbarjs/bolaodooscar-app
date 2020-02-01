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
  },
  transition: "page"
};
</script>

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