<template>
  <div class="selected-nominee" v-bind:class="{ active: isActive }">
    <div class="selected-nominee-content" v-if="nominee">
      <div class="selected-nominee-poster elevation-10">
        <v-img class="selected-nominee-image" v-bind:src="nomineePoster" />
      </div>
      <div class="selected-nominee-info">
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
      </div>
    </div>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
import { mdiStar } from "@mdi/js";
export default {
  data() {
    return {
      nominee: false,
      isActive: false,
      delay: false,
      icons: {
        mdiStar
      }
    };
  },
  computed: {
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
    nomineePoster() {
      return this.nominee.poster
        ? this.nominee.poster
        : this.nominee.movie.poster;
    },
    selectedNominee() {
      return this.$store.getters["vote/getSelectedNominee"](this.categoryId);
    }
  },
  props: {
    categoryId: {
      required: true,
      type: String
    }
  },
  watch: {
    selectedNominee: {
      immediate: true,
      handler(newNominee, oldnNominee) {
        if (newNominee) {
          // prevent re-bind of the same nominee
          if (newNominee !== oldnNominee) {
            // bind current nominee
            try {
              this.$bind(
                "nominee",
                categoriesRef
                  .doc(this.categoryId)
                  .collection("nominees")
                  .doc(newNominee)
              ).then(this.setIsActive);
            } catch (e) {
              console.warn(e);
            }
          } else {
            this.$unbind("nominee");
          }
        }
      }
    },
    nominee: {
      immediate: true,
      handler(nominee) {
        // ui function
        // prevent blink of "nominee" object during re-bind
        if (this.delay) {
          clearTimeout(this.delay);
        }
        if (!!nominee) {
          this.isActive = true;
        } else {
          this.delay = setTimeout(() => {
            this.isActive = false;
          }, 500);
        }
      }
    }
  }
};
</script>

<style>
.selected-nominee {
  display: flex;
  max-height: 200px;
  transition: all 0.6s ease-out;
  width: 100%;
}

.selected-nominee.active {
  margin-bottom: 1.5rem;
  height: 180px;
}

.selected-nominee-content {
  display: flex;
  max-height: 180px;
  width: 100%;
  padding-left: 1.5rem;
}

.selected-nominee-poster {
  height: 100%;
  width: 122px;
}

.selected-nominee-image {
  width: 122px;
  height: 180px;
  object-fit: cover;
  border-radius: 7px;
}

.selected-nominee-info {
  flex: 1;
  display: flex;
  flex-flow: column;
  padding-left: 1rem;
  width: 100px;
}

.selected-nominee-info p {
  margin-bottom: 0;
}

.selected-nominee-name,
.selected-nominee-title,
.selected-nominee-original-title {
  padding-right: 1rem;
}

.selected-nominee-name.subtitle-2 span {
  font-weight: 900;
  font-size: 1.125em;
}

.selected-nominee-original-title {
  font-weight: 500;
  font-size: 0.75em;
}

.selected-nominee-meta {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0.5rem 0;
}

.selected-nominee-meta::after {
  content: ".";
  visibility: hidden;
  min-width: 1rem;
}

.selected-nominee-meta-item {
  display: flex;
  flex-flow: column;
  margin: 0 0.6125rem;
  width: 60px;
}

.selected-nominee-meta-item:first-of-type {
  margin-left: 0;
}

.selected-nominee-meta-item:last-of-type {
  margin-right: 0;
}

.selected-nominee-meta-item-title {
  color: #f5f5f5;
  white-space: nowrap;
  font-size: 0.77em;
  font-weight: 700;
}

.selected-nominee-meta-item-title small {
  color: #e0e0e0;
  font-weight: 500;
}

.selected-nominee-meta-item-subtitle {
  color: #e0e0e0;
  font-size: 0.6875em;
  font-weight: 400;
}
</style>
