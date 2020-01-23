<template>
  <div class="category-list" v-if="categories">
    <category-list-item
      v-for="category in categories"
      v-bind:id="category.id"
      v-bind:name="category.name"
      v-bind:shortName="category.shortName"
      :key="category.id"
    ></category-list-item>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import CategoryListItem from "~/components/CategoryListItem.vue";
export default {
  computed: {
    categories() {
      return this.$store.getters["categories/getCategoryList"];
    }
  },
  components: {
    CategoryListItem
  }
};
</script>

<style>
.category-list {
  margin: 1rem 0;
}
</style>
