<template>
  <div class="nominee-list">
    <nominee-list-item
      v-for="nominee in nominees"
      :key="nominee.id"
      v-bind:id="nominee.id"
      v-bind:categoryId="categoryId"
    ></nominee-list-item>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeListItem from "~/components/NomineeListItem.vue";
export default {
  data() {
    return {
      nominees: []
    };
  },
  props: ["categoryId"],
  watch: {
    categoryId: {
      immediate: true,
      handler() {
        this.$bind(
          "nominees",
          categoriesRef
            .doc(this.categoryId)
            .collection("nominees")
            .orderBy("name", "asc")
        );
      }
    }
  },
  components: {
    NomineeListItem
  }
};
</script>

<style>
.nominee-list {
  position: relative;
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  padding-left: 1.5rem;
}

.nominee-list::after {
  content: ".";
  visibility: hidden;
  min-width: 1.5rem;
}
</style>
