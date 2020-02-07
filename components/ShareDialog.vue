<template>
  <v-dialog v-model="shareDialog" width="320">
    <v-card>
      <v-card-title class="headline">
        Compartilhar
      </v-card-title>
      <v-card-text class="pb-0">
        Compartilhe suas apostas com os seus amigos com o link abaixo:
        <v-text-field
          class="mt-4"
          ref="shareURL"
          id="shareURL"
          outlined
          label="Link público"
          v-model="voteURL"
          :append-icon="icons.mdiContentCopy"
          @input="setText"
          @click:append="copyURL"
        ></v-text-field>
      </v-card-text>
      <!-- <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="shareDialog = false">
          Voltar
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiContentCopy } from "@mdi/js";
export default {
  data() {
    return {
      url: "",
      icons: {
        mdiContentCopy
      }
    };
  },
  computed: {
    shareDialog: {
      get() {
        return this.$store.state.shareDialog;
      },
      set(value) {
        this.$store.commit("setShareDialog", value);
      }
    },
    voteURL: {
      get() {
        const voteId = this.$store.getters["vote/getCurrentVoteId"];
        this.url = voteId ? "https://bolaodooscar.web.app/vote/" + voteId : "";
        return this.url;
      },
      set() {
        this.url = this.url;
      }
    }
  },
  methods: {
    share() {
      // this.$store.dispatch("vote/share");
      this.$store.commit("setShareDialog", false);
    },
    copyURL() {
      const element = document.getElementById(this.$refs.shareURL.id);
      element.select();
      document.execCommand("copy");
    },
    setText() {
      const element = document.getElementById(this.$refs.shareURL.id);
      setTimeout(() => {
        element.value = this.url;
      }, 100);
    }
  }
};
</script>

<style>
</style>