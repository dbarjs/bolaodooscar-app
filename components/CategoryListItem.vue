<template>
  <v-lazy min-height="290px">
    <div class="category-list-item">
      <h3 class="category-list-item-name title">
        <span>{{ category.name }}</span>
      </h3>
      <nominee-list :categoryId="category.id"></nominee-list>
    </div>
  </v-lazy>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeList from "~/components/NomineeList.vue";
import SelectedNominee from "~/components/SelectedNominee.vue";
export default {
  computed: {
    selectedNominee() {
      return this.$store.getters["vote/getSelectedNominee"](this.category.id);
    }
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  components: {
    NomineeList,
    SelectedNominee
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
