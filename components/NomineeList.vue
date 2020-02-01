<template>
  <div class="nominee-list" v-if="categoryId">
    <!-- <selected-nominee :categoryId="categoryId"></selected-nominee> -->
    <nominee-list-item
      v-for="nominee in nominees"
      :key="nominee.id"
      :id="nominee.id"
      :categoryId="categoryId"
      :selectedNominee="selectedNominee"
    ></nominee-list-item>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeListItem from "~/components/NomineeListItem.vue";
import SelectedNominee from "~/components/SelectedNominee.vue";
export default {
  data() {
    return {
      nominees: []
    };
  },
  computed: {
    selectedNominee() {
      return (this.categoryId
      ? this.$store.state.vote.currentVote.choices[this.categoryId]
      : false)
        ? this.$store.state.vote.currentVote.choices[this.categoryId].nomineeId
        : false;
    }
  },
  props: {
    categoryId: {
      required: true
    }
  },
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
    NomineeListItem,
    SelectedNominee
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
