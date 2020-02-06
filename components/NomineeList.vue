<template>
  <div
    class="nominee-list"
    v-if="categoryId"
    :class="{ hasSelectedNominee: selectedNominee }"
  >
    <nominee-list-item
      v-for="nominee in nominees"
      :key="nominee.id"
      :id="nominee.id"
      :categoryId="categoryId"
      :selectedNominee="selectedNominee"
      :signedUserIsVoteOwner="signedUserIsVoteOwner"
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
  computed: {
    selectedNominee() {
      return this.$store.getters["vote/getSelectedNominee"](this.categoryId);
    },
    signedUserIsVoteOwner() {
      const userId = this.$store.getters["user/getUserId"];
      const ownerId = this.$store.getters["vote/getCurrentVoteOwnerId"];
      return userId && ownerId ? userId === ownerId : false;
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
  overflow-y: hidden;
  padding-left: 1.5rem;
}

.nominee-list::after {
  content: ".";
  visibility: hidden;
  min-width: 1.5rem;
  transition: all 0.6s ease-in-out;
}

.nominee-list.hasSelectedNominee::after {
  min-width: 0;
}
</style>
