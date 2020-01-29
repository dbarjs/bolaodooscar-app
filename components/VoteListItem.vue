<template>
  <v-col cols="12" v-if="vote">
    <v-card>
      <v-card-title class="subtitle-1 font-weight-bold">
        <span v-if="vote.title">{{ vote.title }}</span>
        <span v-else>Sem Título</span>
        <v-btn icon @click.stop="showTitleDialog()">
          <v-icon small>{{ icons.mdiPencil }}</v-icon>
        </v-btn>
        <v-dialog
          v-model="editTitleDialog"
          max-width="400px"
          persistent
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title class="headline">
              Qual o nome do voto?
            </v-card-title>
            <v-container>
              <v-text-field
                outlined
                label="Título da Votação"
                ref="titleTextField"
                v-model="newTitle"
              ></v-text-field>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeTitleDialog">
                Cancelar
              </v-btn>
              <v-btn color="green darken-1" text @click="saveTitle">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-subtitle>
        {{ creationDate }}
      </v-card-subtitle>
      <choice-list :choices="vote.choices"></choice-list>
    </v-card>
  </v-col>
</template>

<script>
import ChoiceList from "~/components/ChoiceList.vue";
import { DateTime } from "luxon";
import { votesRef } from "~/firebase";
import { mdiPencil } from "@mdi/js";
import autoParse from "auto-parse";
export default {
  data() {
    return {
      vote: false,
      editTitleDialog: false,
      newTitle: "",
      icons: {
        mdiPencil
      }
    };
  },
  computed: {
    creationDate() {
      return DateTime.fromSeconds(this.vote.timestamp.seconds).toRelative();
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
    ChoiceList
  }
};
</script>

<style></style>
