<template>
  <div class="category-list" v-if="categories">
    <category-list-item
      v-for="category in categories"
      v-bind:category="category"
      :key="category.id"
    ></category-list-item>
    <v-fab-transition>
      <v-btn
        color="accent"
        fab
        large
        dark
        fixed
        right
        bottom
        class="v-btn--example"
        @click="shareVote"
      >
        <v-icon>{{ icons.mdiShare }}</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import { mdiShare } from "@mdi/js";
import CategoryListItem from "~/components/CategoryListItem.vue";
export default {
  data() {
    return {
      icons: {
        mdiShare
      }
    };
  },
  computed: {
    categories() {
      return this.$store.getters["categories/getCategoryList"];
    }
  },
  methods: {
    shareVote() {
      this.$store.dispatch("vote/shareVote");
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
  max-width: 760px;
  width: 100%;
}

@media screen and (min-width: 1000px) {
  .category-list {
    max-width: 900px;
  }
}
</style>
