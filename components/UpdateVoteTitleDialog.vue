<template>
  <v-dialog v-model="updateVoteTitleDialog" width="320">
    <v-card>
      <v-card-title class="headline">
        Renomear aposta
      </v-card-title>
      <v-card-text class="pb-0">
        <v-text-field
          class="mt-0"
          single-line
          ref="titleTextField"
          id="titleTextField"
          v-model="title"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn
          color="light-blue darken-1"
          text
          @click="updateVoteTitleDialog = false"
        >
          Cancelar
        </v-btn>
        <v-btn color="light-blue darken-1" text @click="update">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  computed: {
    getCurrentVoteTitle() {
      return this.$store.getters["vote/getCurrentVoteTitle"];
    },
    updateVoteTitleDialog: {
      get() {
        return this.$store.state.updateVoteTitleDialog;
      },
      set(value) {
        this.$store.commit("setUpdateVoteTitleDialog", value);
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch("vote/updateTitle", this.title.trim());
      this.$store.commit("setUpdateVoteTitleDialog", false);
    }
  },
  watch: {
    getCurrentVoteTitle: {
      immediate: true,
      handler(title) {
        this.title = title;
      }
    }
  }
};
</script>

<style>
</style>