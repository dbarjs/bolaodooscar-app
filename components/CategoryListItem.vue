<template>
  <div class="category-list-item">
    <h3 class="category-list-item-name title">
      <span>{{ shortName }}</span>
      <span v-if="currentChoices">({{ currentChoices.nomineeName }})</span>
    </h3>
    <nominee-list v-bind:category-id="id"></nominee-list>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeList from "~/components/NomineeList.vue";
export default {
  components: {
    NomineeList
  },
  computed: {
    currentChoices() {
      return this.id ? this.$store.state.currentChoices[this.id] : false;
    }
  },
  props: {
    id: {
      required: true
    },
    name: String,
    shortName: String
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
