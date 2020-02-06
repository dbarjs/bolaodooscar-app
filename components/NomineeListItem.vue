<template>
  <div v-if="nominee" class="nominee-list-item" :class="classObject">
    <div
      class="nominee-list-item-content"
      :class="{ horizontal: !actionEnabled }"
    >
      <div class="nominee-list-item-poster elevation-10">
        <v-img class="nominee-list-item-image" v-bind:src="getNomineePoster" />
      </div>
      <div class="selected-nominee-info" v-if="!actionEnabled && isSelected">
        <h4 class="selected-nominee-name subtitle-2">
          <span>{{ nominee.name }}</span>
        </h4>
        <p class="selected-nominee-title subtitle-2" v-if="title">
          <span>{{ title }}</span>
        </p>
        <p
          class="selected-nominee-original-title"
          v-if="!title && originalTitle"
        >
          <span>{{ originalTitle }} (original)</span>
        </p>
        <div class="selected-nominee-meta">
          <div class="selected-nominee-meta-item imdb" v-if="imdbRating">
            <span class="selected-nominee-meta-item-title">
              <span>
                <v-icon color="#f5c518" x-small>
                  {{ icons.mdiStar }}
                </v-icon>
                {{ imdbRating }}
                <small>/10</small>
              </span>
            </span>
            <span class="selected-nominee-meta-item-subtitle">
              <span>IMDb</span>
            </span>
          </div>
          <v-divider vertical inset></v-divider>
          <div class="selected-nominee-meta-item metascore" v-if="metascore">
            <span class="selected-nominee-meta-item-title">
              <span>{{ metascore }} </span>
            </span>
            <span class="selected-nominee-meta-item-subtitle">
              <span>Metacritic</span>
            </span>
          </div>
          <v-divider vertical inset></v-divider>
          <div class="selected-nominee-meta-item runtime" v-if="runtime">
            <span class="selected-nominee-meta-item-title">
              <span v-if="runtime.hours">{{ runtime.hours }}h</span>
              <span>{{ runtime.minutes }}min </span>
            </span>
            <span class="selected-nominee-meta-item-subtitle">
              <span>Duração</span>
            </span>
          </div>
        </div>
        <v-btn color="success" @click="removeVote">troca</v-btn>
      </div>
    </div>
    <div
      class="nominee-list-item-action"
      v-if="signedUserIsVoteOwner && actionEnabled"
    >
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
      <div class="nominee-list-item-label">
        <span class="nominee-list-item-label-title subtitle-2">
          <span>{{ nominee.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { categoriesRef, votesRef } from "~/firebase";
import { mdiStar } from "@mdi/js";
export default {
  data() {
    return {
      nominee: null,
      isLoading: false,
      actionEnabled: true,
      actionEnabledDelay: false,
      icons: {
        mdiStar
      }
    };
  },
  computed: {
    isSelected() {
      return this.nominee ? this.selectedNominee === this.nominee.id : false;
    },
    isNotSelected() {
      return this.nominee && this.selectedNominee
        ? this.selectedNominee !== this.nominee.id
        : false;
    },
    classObject() {
      return {
        selected: this.isSelected,
        hidden: this.isNotSelected
      };
    },
    currentVote() {
      return this.$store.state.currentVote;
    },
    runtime() {
      try {
        return {
          hours: parseInt(this.nominee.movie.runtime / 60),
          minutes: parseInt(this.nominee.movie.runtime) & 60
        };
      } catch (e) {
        return false;
      }
    },
    originalTitle() {
      return this.nominee.movie.title !== this.nominee.movie.originalTitle
        ? this.nominee.movie.originalTitle
        : false;
    },
    title() {
      return this.nominee.movie.title !== this.nominee.name
        ? this.nominee.movie.title
        : false;
    },
    imdbRating() {
      return this.nominee.movie.imdbRating;
    },
    metascore() {
      return this.nominee.movie.metascore || false;
    },
    getNomineePoster() {
      return this.nominee.poster
        ? this.nominee.poster
        : this.nominee.movie.poster;
    }
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
    },
    removeVote() {
      this.$store.dispatch("vote/removeVote", this.categoryId);
    }
  },
  props: ["id", "categoryId", "selectedNominee", "signedUserIsVoteOwner"],
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
    },
    nominee: {
      immediate: true,
      handler(nominee) {
        if (nominee) {
          if (!nominee.movieId) {
            console.warn(
              "Um indicado necessita de alguma especificação",
              nominee,
              this.categoryId
            );
          }
        }
      }
    },
    selectedNominee: {
      immediate: true,
      handler(selectedNominee) {
        if (selectedNominee) {
          this.actionEnabledDelay = setTimeout(() => {
            this.actionEnabled = false;
          }, 600);
        } else {
          this.actionEnabledDelay = setTimeout(() => {
            this.actionEnabled = true;
          }, 600);
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
  transition: all 0.6s ease-in-out;
  width: 90px;
}

.nominee-list-item:first-of-type {
  margin-left: 0;
}

.nominee-list-item:last-of-type {
  margin-right: 0;
}

.nominee-list-item.selected {
  margin: 0;
  width: 100%;
}

.nominee-list-item.hidden {
  height: 0;
  width: 0%;
  margin: 0;
}

.nominee-list-item-content.horizontal {
  display: flex;
  flex-flow: row;
}

.nominee-list-item-poster {
  margin-bottom: 0.75em;
  border-radius: 7px;
  overflow: hidden;
  transition: opacity;
  width: 90px;
}

.nominee-list-item.selected .nominee-list-item-poster {
  width: 122px;
}

.nominee-list-item.hidden .nominee-list-item-poster {
  opacity: 0;
  width: 0;
}

.nominee-list-item-image {
  width: 90px;
  height: 133px;
  object-fit: cover;
  transition: height 0.6s ease-in-out;
}

.nominee-list-item.selected .nominee-list-item-image {
  width: 122px;
  height: 180px;
}

.nominee-list-item.hidden .nominee-list-item-image {
  width: 0;
}

.nominee-list-item-action {
  transition: all 0.6s ease-in-out;
}

.nominee-list-item.selected .nominee-list-item-action,
.nominee-list-item.hidden .nominee-list-item-action {
  opacity: 0;
  height: 0;
}

.nominee-list-item-label {
  display: flex;
  flex-flow: column;
  width: 100%;
}

.nominee-list-item-label-title.subtitle-2 {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.1;
}

.nominee-list-item-label-title.subtitle-2 span {
  font-size: 0.77em;
  font-weight: 500;
  line-height: 0.5em;
}
</style>
