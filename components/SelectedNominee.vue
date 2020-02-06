<template>
  <div class="selected-nominee d-flex" v-bind:class="{ active: isActive }">
    <div class="selected-nominee-content d-flex" v-if="nominee">
      <div class="selected-nominee-poster elevation-10">
        <v-img
          class="selected-nominee-image"
          v-bind:src="nomineePoster"
          height="200px"
        />
      </div>
      <div class="selected-nominee-meta">
        <h4 class="selected-nominee-name subtitle-2">
          <span>{{ nominee.name }}</span>
        </h4>
        <p class="selected-nominee-title subtitle-2" v-if="title">
          <span>{{ title }}</span>
        </p>
        <p class="selected-nominee-original-title caption" v-if="originalTitle">
          <span>{{ originalTitle }} (original)</span>
        </p>
        <p class="selected-nominee-imdb-rating overline" v-if="imdbRating">
          <span>{{ imdbRating }} <small>/10</small> </span>
        </p>
        <p class="selected-nominee-runtime overline" v-if="runtime">
          <span v-if="runtime.hours">{{ runtime.hours }}h</span>
          <span>{{ runtime.minutes }}min </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { categoriesRef } from "~/firebase";
export default {
  data() {
    return {
      nominee: false,
      isActive: false,
      delay: false
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
  padding: 0 1.5rem;
  transition: all 0.6s ease-out;
  max-height: 200px;
}

.selected-nominee.active {
  margin-bottom: 1.5rem;
  height: 200px;
}

.selected-nominee-content {
  max-height: 200px;
}

.selected-nominee-poster {
  height: 100%;
  margin-right: 1rem;
}

.selected-nominee-image {
  width: 136px;
  height: 200px;
  object-fit: cover;
  border-radius: 7px;
}

.selected-nominee-meta p {
  margin-bottom: 0;
}

.selected-nominee-name.subtitle-2 span {
  font-weight: 900;
  font-size: 1.125em;
}
</style>
