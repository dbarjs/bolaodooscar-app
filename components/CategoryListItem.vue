<template>
  <div class="category-list-item">
    <h3 class="category-list-item-name title">{{ name }}</h3>
    <nominee-list v-bind:category-id="id"></nominee-list>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeList from "~/components/NomineeList.vue";
export default {
  props: {
    id: {
      required: true
    },
    name: String
  },
  components: {
    NomineeList
  }
};
</script>

<style>
.category-list-item {
  padding: 0 0 0.5rem;
}

.category-list-item-name.title {
  font-size: 1rem !important;
  font-weight: 500;
  margin: 0 0 1.125rem 1.5rem;
}
</style>
