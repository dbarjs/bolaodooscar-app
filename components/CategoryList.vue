<template>
  <div class="category-list" v-if="categories">
    <category-list-item
      v-for="category in categories"
      v-bind:category="category"
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
  },
  created() {
    this.$store.dispatch("categories/bindCategoriesRef");
  }
};
</script>

<style>
.category-list {
  margin: 0.5rem 0 4.5rem;
}
</style>
