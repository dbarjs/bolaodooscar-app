<template>
  <div v-if="nominee" class="nominee-list-item" :class="classObject">
    <div
      class="nominee-list-item-content"
      :class="{ horizontal: !actionEnabled }"
    >
      <div class="nominee-list-item-poster elevation-10">
        <v-img class="nominee-list-item-image" v-bind:src="getNomineePoster" />
      </div>
      <div class="nominee-list-item-info" v-if="!actionEnabled && isSelected">
        <div
          v-if="hasWinner"
          class="nominee-list-item-winner mb-2 font-weight-bold"
        >
          <v-chip v-if="isWinner" light color="#f5c518">
            Vencedor
          </v-chip>
          <v-chip v-if="!isWinner" light outlined color="red darken-4">
            Não venceu
          </v-chip>
        </div>
        <h4 class="nominee-list-item-name subtitle-2">
          <span>{{ nominee.name }}</span>
        </h4>
        <p class="nominee-list-item-title subtitle-2" v-if="title">
          <span>{{ title }}</span>
        </p>
        <p
          class="nominee-list-item-original-title"
          v-if="!title && originalTitle"
        >
          <span>{{ originalTitle }} (original)</span>
        </p>
        <div class="nominee-list-item-meta">
          <div class="nominee-list-item-meta-item imdb" v-if="imdbRating">
            <span class="nominee-list-item-meta-item-title">
              <span>
                <v-icon color="#f5c518" x-small>
                  {{ icons.mdiStar }}
                </v-icon>
                {{ imdbRating }}
                <small>/10</small>
              </span>
            </span>
            <span class="nominee-list-item-meta-item-subtitle">
              <span>IMDb</span>
            </span>
          </div>
          <v-divider vertical inset></v-divider>
          <div class="nominee-list-item-meta-item metascore" v-if="metascore">
            <span class="nominee-list-item-meta-item-title">
              <span>{{ metascore }} </span>
            </span>
            <span class="nominee-list-item-meta-item-subtitle">
              <span>Metacritic</span>
            </span>
          </div>
          <v-divider vertical inset></v-divider>
          <div class="nominee-list-item-meta-item runtime" v-if="runtime">
            <span class="nominee-list-item-meta-item-title">
              <span v-if="runtime.hours">{{ runtime.hours }}h</span>
              <span>{{ runtime.minutes }}min </span>
            </span>
            <span class="nominee-list-item-meta-item-subtitle">
              <span>Duração</span>
            </span>
          </div>
        </div>
        <div class="nominee-list-item-winner" v-if="hasWinner && !isWinner">
          <span v-if="winner">Vencedor: {{ winner.name }}</span>
        </div>
        <div class="d-flex" v-if="signedUserIsVoteOwner && !hasWinner">
          <v-btn color="warning" outlined x-small @click="removeVote"
            >Desfazer Voto</v-btn
          >
        </div>
      </div>
    </div>
    <div
      class="nominee-list-item-action"
      v-if="signedUserIsVoteOwner && actionEnabled"
    >
      <v-btn
        class="nominee-list-item-action-button"
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
    isWinner() {
      return this.nominee && this.winner
        ? this.nominee.id === this.winner.id
        : false;
    },
    hasWinner() {
      return !!this.winner;
    },
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
  props: [
    "id",
    "categoryId",
    "selectedNominee",
    "signedUserIsVoteOwner",
    "winner"
  ],
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
  margin: 0;
  width: 0;
}

.nominee-list-item-content.horizontal {
  display: flex;
  flex-flow: row;
}

.nominee-list-item-poster {
  margin-bottom: 0.75em;
  border-radius: 7px;
  overflow: hidden;
  transition: all 0.4s 0.2s ease-in-out;
  height: 133px;
  width: 90px;
}

.nominee-list-item.selected .nominee-list-item-poster {
  height: 180px;
  width: 122px;
}

.nominee-list-item.hidden .nominee-list-item-poster {
  opacity: 0;
  height: 0;
  width: 0;
}

.nominee-list-item-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.nominee-list-item-action {
  transition: all 0.6s ease-in-out;
}

.nominee-list-item-action-button {
  margin-bottom: 4px !important;
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

.nominee-list-item-info {
  flex: 1;
  display: flex;
  flex-flow: column;
  padding-left: 1rem;
  width: 100px;
}

.nominee-list-item-info p {
  margin-bottom: 0;
}

.nominee-list-item-name,
.nominee-list-item-title,
.nominee-list-item-original-title,
.nominee-list-item-winner {
  padding-right: 1rem;
}

.nominee-list-item-name.subtitle-2 span {
  font-weight: 900;
  font-size: 1.125em;
}

.nominee-list-item-original-title {
  font-weight: 500;
  font-size: 0.75em;
}

.nominee-list-item-meta {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0.5rem 0;
}

.nominee-list-item-meta::after {
  content: ".";
  visibility: hidden;
  min-width: 1rem;
}

.nominee-list-item-meta-item {
  display: flex;
  flex-flow: column;
  margin: 0 0.6125rem;
  width: 60px;
}

.nominee-list-item-meta-item:first-of-type {
  margin-left: 0;
}

.nominee-list-item-meta-item:last-of-type {
  margin-right: 0;
}

.nominee-list-item-meta-item-title {
  color: #f5f5f5;
  white-space: nowrap;
  font-size: 0.77em;
  font-weight: 700;
}

.nominee-list-item-meta-item-title small {
  color: #e0e0e0;
  font-weight: 500;
}

.nominee-list-item-meta-item-subtitle {
  color: #e0e0e0;
  font-size: 0.6875em;
  font-weight: 400;
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

.nominee-list-item-winner {
  font-size: 0.77em;
}

@media screen and (min-width: 800px) {
  .nominee-list-item {
    width: 122px;
    margin: 0 0.5625em 1.5em;
  }

  .nominee-list-item.selected {
    max-width: 480px;
  }

  .nominee-list-item-poster {
    height: 180px;
    width: 122px;
  }

  .nominee-list-item.selected .nominee-list-item-poster {
    height: 230px;
    width: 156px;
  }

  .nominee-list-item-action-button {
    height: 24px !important;
    margin-bottom: 6px !important;
  }

  .nominee-list-item-info {
    padding-left: 1rem;
  }

  .nominee-list-item-name,
  .nominee-list-item-title,
  .nominee-list-item-original-title {
    padding-right: 1.5rem;
  }

  .nominee-list-item-name.subtitle-2 span {
    font-size: 1.5em;
  }

  .nominee-list-item-original-title {
    font-size: 1em;
  }

  .nominee-list-item-meta {
    margin: 0.875rem 0;
  }

  .nominee-list-item-meta::after {
    min-width: 1rem;
  }

  .nominee-list-item-meta-item {
    margin: 0 0.875rem;
    width: 64px;
  }

  .nominee-list-item-meta-item-title {
    font-size: 0.87em;
  }

  .nominee-list-item-meta-item-subtitle {
    font-size: 0.75em;
  }

  .nominee-list-item-label-title.subtitle-2 {
    line-height: 1.25;
  }

  .nominee-list-item-label-title.subtitle-2 span {
    font-size: 0.87em;
  }

  .nominee-list-item-winner {
    font-size: 0.87em;
  }
}

@media screen and (min-width: 1000px) {
  .nominee-list-item {
    width: 156px;
    margin: 0 0.5625em 1.5em;
  }

  .nominee-list-item-poster {
    height: 230px;
    width: 156px;
  }

  .nominee-list-item.selected .nominee-list-item-poster {
    height: 230px;
    width: 156px;
  }
}
</style>
