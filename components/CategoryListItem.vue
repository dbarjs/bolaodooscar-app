<template>
  <v-lazy min-height="180px" v-show="selectedNominee || signedUserIsVoteOwner">
    <div class="category-list-item">
      <h3 class="category-list-item-name title">
        <span>{{ category.name }}</span>
      </h3>
      <nominee-list
        v-if="showNomineeList"
        :categoryId="category.id"
        :nominees="nominees"
      ></nominee-list>
      <div v-else-if="winner" class="category-list-item-winner mb-2">
        <v-card outlined>
          <v-card-title class="grey--text text--lighten-1">
            Você não votou nessa categoria
          </v-card-title>
          <v-card-subtitle class="grey--text text--lighten-1 pb-0">
            Veja quem se deu bem:
          </v-card-subtitle>
          <v-list dense>
            <v-list-item v-for="nominee in nominees" :key="nominee.id">
              <v-list-item-icon>
                <v-icon v-if="winner.id === nominee.id" color="#f5c518">
                  {{ icons.mdiOctagram }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="nominee.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </v-lazy>
</template>

<script>
import { categoriesRef } from "~/firebase";
import NomineeList from "~/components/NomineeList.vue";
import SelectedNominee from "~/components/SelectedNominee.vue";
import { mdiOctagram } from "@mdi/js";
export default {
  data() {
    return {
      nominees: [],
      icons: {
        mdiOctagram
      }
    };
  },
  computed: {
    showNomineeList() {
      return !this.winner ? true : this.winner && this.selectedNominee;
    },
    winner() {
      return this.category.winner;
    },
    selectedNominee() {
      return this.$store.getters["vote/getSelectedNominee"](this.category.id);
    },
    signedUserIsVoteOwner() {
      const userId = this.$store.getters["user/getUserId"];
      const ownerId = this.$store.getters["vote/getCurrentVoteOwnerId"];
      return userId && ownerId ? userId === ownerId : false;
    }
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  components: {
    NomineeList,
    SelectedNominee
  },
  watch: {
    category: {
      immediate: true,
      handler(category) {
        if (category.id) {
          this.$bind(
            "nominees",
            categoriesRef
              .doc(this.category.id)
              .collection("nominees")
              .orderBy("name", "asc")
          );
        } else {
          this.$unbind("nominees");
        }
      }
    }
  }
};
</script>

<style>
.category-list-item {
  padding: 0 0 0.5rem;
}

.category-list-item-name.title {
  font-size: 1rem !important;
  font-weight: 500;
  margin: 0 0 1.125rem 1.5rem;
}

.category-list-item-winner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media screen and (min-width: 1000px) {
  .category-list-item-name.title {
    font-size: 1.125rem !important;
    margin: 0.25rem 0 1.3125rem 1.5rem;
  }
}
</style>
