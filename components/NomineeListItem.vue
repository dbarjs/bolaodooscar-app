<template>
  <div v-if="nominee" class="nominee-list-item">
    <div class="nominee-list-item-poster elevation-10">
      <v-img
        class="nominee-list-item-image"
        v-bind:src="nominee.movie.poster"
      />
    </div>
    <div class="nominee-list-item-meta">
      <span class="nominee-list-item-title subtitle-2">
        <span>{{ nominee.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
export default {
  data() {
    return {
      nominee: null
    };
  },
  props: ["id", "categoryId"],
  watch: {
    id: {
      immediate: true,
      handler() {
        this.$bind(
          "nominee",
          categoriesRef
            .doc(this.categoryId)
            .collection("nominees")
            .doc(this.id)
        );
      }
    }
  }
};
</script>

<style>
.nominee-list-item {
  display: flex;
  flex-flow: column;
  margin: 0 0.5625em 1.125em;
  width: 90px;
}

.nominee-list-item:first-of-type {
  margin-left: 0;
}

.nominee-list-item:last-of-type {
  margin-right: 0;
}

.nominee-list-item-poster {
  margin-bottom: 0.75em;
  border-radius: 7px;
  overflow: hidden;
}

.nominee-list-item-image {
  width: 90px;
  height: 133px;
  object-fit: cover;
}

.nominee-list-item-meta {
  display: flex;
  flex-flow: column;
  width: 100%;
}

.nominee-list-item-title.subtitle-2 {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.1;
}

.nominee-list-item-title.subtitle-2 span {
  font-size: 0.77em;
  font-weight: 500;
  line-height: 0.5em;
}

.nominee-list-item-rating {
  display: flex;
  flex-flow: row;
  align-content: center;
  font-weight: 400;
}

.nominee-list-item-rating span {
  letter-spacing: inherit;
}

.nominee-list-item-rating .imdb {
  margin-right: 0.375em;
}
</style>
