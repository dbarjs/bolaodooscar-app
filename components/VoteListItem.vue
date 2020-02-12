<template>
  <v-col cols="12" v-if="vote">
    <v-card>
      <v-list-group v-model="showChoiceList">
        <template v-slot:activator>
          <v-list-item-avatar size="32">
            <v-icon>{{ icons.mdiStarBoxMultiple }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              <span v-if="vote.title">{{ vote.title }}</span>
              <span v-else>Sem Título</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span v-if="winCount">
                <span>
                  {{ winCount }} {{ winCount > 1 ? "acertos" : "acerto" }} -
                </span>
              </span>
              <span>{{ creationDate }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <choice-item
          v-for="choice in orderedChoices"
          :key="choice.categoryId"
          :choice="choice"
        ></choice-item>
      </v-list-group>
      <v-card-actions>
        <v-btn text :to="voteLink">Visualizar</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="showTitleDialog()">
          <v-icon>{{ icons.mdiPencil }}</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="deleteVote">
          <v-icon>{{ icons.mdiDelete }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="editTitleDialog"
        max-width="400px"
        persistent
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title class="headline">
            Renomear aposta
          </v-card-title>
          <v-card-text class="py-0">
            <v-text-field
              class="my-0 py-0"
              single-line
              label="Título da Votação"
              ref="titleTextField"
              v-model="newTitle"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="light-blue darken-1" text @click="closeTitleDialog">
              Cancelar
            </v-btn>
            <v-btn color="light-blue darken-1" text @click="saveTitle">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<script>
import ChoiceItem from "~/components/ChoiceItem.vue";
import { DateTime } from "luxon";
import { votesRef } from "~/firebase";
import { mdiPencil, mdiStarBoxMultiple, mdiDelete } from "@mdi/js";
import autoParse from "auto-parse";
export default {
  data() {
    return {
      vote: false,
      editTitleDialog: false,
      showChoiceList: false,
      newTitle: "",
      icons: {
        mdiPencil,
        mdiStarBoxMultiple,
        mdiDelete
      }
    };
  },
  computed: {
    winCount() {
      return this.vote.choices
        ? Object.values(this.vote.choices).filter(choice => {
            return choice.category
              ? choice.category.winner
                ? choice.category.winner.id === choice.nomineeId
                : false
              : false;
          }).length
        : false;
    },
    voteLink() {
      return this.vote ? "/vote/" + this.voteId : "/";
    },
    creationDate() {
      return this.vote.created.seconds
        ? DateTime.fromSeconds(this.vote.created.seconds).toRelative()
        : false;
    },
    orderedChoices() {
      // order Choices using Category "order" property
      return Object.values(this.vote.choices).sort((a, b) => {
        if (a.category.order < b.category.order) {
          return -1;
        } else if (a.category.order > b.category.order) {
          return 1;
        }
        return 0;
      });
    }
  },
  methods: {
    saveTitle() {
      if (this.vote.id) {
        votesRef
          .doc(this.vote.id)
          .update({
            title: autoParse(this.$refs.titleTextField.value.trim(), String)
          })
          // bind again the doc reference
          .then(this.bindVote);
        this.closeTitleDialog();
      }
    },
    closeTitleDialog() {
      this.editTitleDialog = false;
    },
    showTitleDialog() {
      if (this.vote.title) {
        this.newTitle = this.vote.title;
      }
      this.editTitleDialog = true;
    },
    deleteVote() {
      votesRef.doc(this.voteId).delete();
      this.$unbind("vote");
    },
    bindVote() {
      // temporary function
      // waiting this bug fix of Vuefire:
      // https://github.com/vuejs/vuefire/issues/576
      this.$bind("vote", votesRef.doc(this.voteId));
    }
  },
  props: {
    voteId: {
      required: true,
      type: String
    }
  },
  watch: {
    voteId: {
      immediate: true,
      handler() {
        this.bindVote();
      }
    }
  },
  components: {
    ChoiceItem
  }
};
</script>

<style>
.v-list-group--active > .v-list-group__header .v-list-item__content {
  color: #ffffff !important;
}
</style>
