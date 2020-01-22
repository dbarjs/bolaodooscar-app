<template>
  <div>
    <vote-toolbar></vote-toolbar>
    <header class="py-6">
      <v-container class="d-flex flex-column align-center">
        <v-img class="logo" src="bdo-logo.png" max-width="300"></v-img>
      </v-container>
    </header>
    <category-list></category-list>
  </div>
</template>

<script>
import CategoryList from "~/components/CategoryList.vue";
import VoteToolbar from "~/components/VoteToolbar.vue";

export default {
  components: {
    CategoryList,
    VoteToolbar
  },
  created() {
    this.$store.dispatch("categories/bindCategoriesRef");
  },
  methods: {}
};
</script>
