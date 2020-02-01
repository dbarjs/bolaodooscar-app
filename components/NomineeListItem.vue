<template>
  <div v-if="nominee" class="nominee-list-item">
    <div class="nominee-list-item-poster elevation-10">
      <v-img class="nominee-list-item-image" v-bind:src="getNomineePoster" />
    </div>
    <div class="nominee-list-item-action">
      <v-btn
        :disabled="isSelected"
        :loading="isLoading && !isSelected"
        dense
        x-small
        block
        color="secondary"
        @click="vote"
      >
        <span v-if="!isSelected">Votar</span>
        <span v-else>Selecionado</span>
      </v-btn>
    </div>
    <div class="nominee-list-item-meta">
      <span class="nominee-list-item-title subtitle-2">
        <span>{{ nominee.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { categoriesRef, votesRef } from "~/firebase";
export default {
  computed: {
    isSelected() {
      return this.nominee ? this.selectedNominee === this.nominee.id : false;
    },
    currentVote() {
      return this.$store.state.currentVote;
    },
    getNomineePoster() {
      return this.nominee.poster
        ? this.nominee.poster
        : this.nominee.movie.poster;
    }
  },
  data() {
    return {
      nominee: null,
      isLoading: false
    };
  },
  methods: {
    vote() {
      this.isLoading = true;
      this.$store.dispatch("vote/addChoice", {
        nomineeId: this.id,
        nomineeName: this.nominee.name,
        categoryId: this.categoryId,
        movieId: this.nominee.movieId
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  },
  props: ["id", "categoryId", "selectedNominee"],
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
        this.$bind("category", categoriesRef.doc(this.categoryId));
      }
    },
    isSelected: {
      handler(value) {
        if (value && this.isLoading) {
          this.isLoading = false;
        }
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

.nominee-list-item-action {
  margin-bottom: 0.375em;
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
