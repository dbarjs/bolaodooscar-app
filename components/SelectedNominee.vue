<template>
  <div class="selected-nominee" v-if="selectedNominee">
    <div class="selected-nominee-content d-flex" v-if="nominee">
      <div class="selected-nominee-poster elevation-10">
        <v-img class="selected-nominee-image" v-bind:src="getNomineePoster" />
      </div>
      <div class="selected-nominee-meta">
        <span class="selected-nominee-title subtitle-2">
          <span>{{ nominee.name }}</span>
        </span>
      </div>
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

<style>
.selected-nominee {
  min-width: 240px;
}

.selected-nominee-image {
  width: 136px;
  height: 200px;
  object-fit: cover;
}
</style>
