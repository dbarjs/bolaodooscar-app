<template>
  <div v-if="nominee">
    <div class="nominee-list-item-poster elevation-10">
      <v-img class="nominee-list-item-image" v-bind:src="getNomineePoster" />
    </div>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
export default {
  data() {
    return {
      nominee: false
    };
  },
  computed: {
    selectedNominee() {
      return this.categoryId
        ? this.$store.state.currentChoices[this.categoryId]
        : false;
    },
    getNomineePoster() {
      return this.nominee.poster
        ? this.nominee.poster
        : this.nominee.movie.poster;
    }
  },
  props: {
    categoryId: {
      required: true
    }
  },
  watch: {
    selectedNominee: {
      immediate: true,
      handler(newNominee, oldnNominee) {
        // prevent re-bind of the same nominee
        if (JSON.stringify(newNominee) !== JSON.stringify(oldnNominee)) {
          // bind current nominee
          if (newNominee) {
            this.$bind(
              "nominee",
              categoriesRef
                .doc(newNominee.categoryId)
                .collection("nominees")
                .doc(newNominee.nomineeId)
            );
          } else {
            this.$unbind("nominee");
          }
        }
      }
    }
  }
};
</script>

<style></style>
