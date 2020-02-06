<template>
  <v-dialog v-model="clearChoicesDialog" width="290">
    <v-card>
      <v-card-title class="headline">
        Deseja excluir as suas seleções?
      </v-card-title>
      <v-card-text>
        Não será possível recuperar suas seleções após isso.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="clearChoicesDialog = false">
          Cancelar
        </v-btn>
        <v-btn color="red darken-1" text @click="clearChoices">
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlaylistRemove } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiPlaylistRemove
      }
    };
  },
  computed: {
    clearChoicesDialog: {
      get() {
        return this.$store.state.clearChoicesDialog;
      },
      set(value) {
        this.$store.commit("setClearChoicesDialog", value);
      }
    }
  },
  methods: {
    clearChoices() {
      this.$store.dispatch("vote/clearChoices");
      this.$store.commit("setClearChoicesDialog", false);
    }
  }
};
</script>

<style>
</style>