<template>
  <v-app-bar
    app
    transition="slide-y-transition"
    color="#212121"
    elevate-on-scroll
  >
    <v-btn icon @click="setCurrentVote">
      <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-toolbar-title class="pl-0 fill-height d-flex align-center">
      <div
        v-ripple
        class="vote-toolbar-info v-list-item--link"
        @click.stop="showUpdateVoteTitleDialog"
      >
        <div class="vote-toolbar-title">
          <span v-if="voteTitle">{{ voteTitle }}</span>
          <span v-else>Aposta sem Título</span>
        </div>
        <span class="vote-toolbar-status" v-if="numberOfVotes">
          {{ numberOfVotes }} / {{ numberOfCategories }} votos (salvo)
        </span>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="clearChoices">
      <v-icon icon dark>{{ icons.mdiPlaylistRemove }}</v-icon>
    </v-btn>
    <v-btn icon @click="shareVote">
      <v-icon icon dark>{{ icons.mdiShare }}</v-icon>
    </v-btn>
    <clear-choices-dialog></clear-choices-dialog>
    <share-dialog></share-dialog>
    <update-vote-title-dialog></update-vote-title-dialog>
  </v-app-bar>
</template>

<script>
import ClearChoicesDialog from "~/components/ClearChoicesDialog.vue";
import ShareDialog from "~/components/ShareDialog.vue";
import UpdateVoteTitleDialog from "~/components/UpdateVoteTitleDialog.vue";
import {
  votesRef,
  usersRef,
  categoriesRef,
  moviesRef,
  Timestamp
} from "~/firebase";
import { mdiArrowLeft, mdiShare, mdiPlaylistRemove } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiArrowLeft, mdiShare, mdiPlaylistRemove }
    };
  },
  computed: {
    voteTitle() {
      return this.$store.getters["vote/getCurrentVoteTitle"];
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    isVoting() {
      return !!this.$store.state.vote;
    },
    numberOfVotes() {
      return Object.keys(this.$store.getters["vote/getChoices"]).length;
    },
    numberOfCategories() {
      return this.$store.getters["categories/getCategoryList"].length;
    },
    currentVoteId() {
      return this.$store.getters["vote/getCurrentVoteId"];
    }
  },
  methods: {
    setCurrentVote() {
      // this delay prevents the ui don't update until the page is changed
      setTimeout(() => {
        this.$store.dispatch("vote/unbindVoteRef");
      }, 500);
      this.$router.push("/");
    },
    clearChoices() {
      this.$store.commit("setClearChoicesDialog", true);
    },
    shareVote() {
      this.$store.dispatch("vote/shareVote");
    },
    showUpdateVoteTitleDialog() {
      this.$store.commit("setUpdateVoteTitleDialog", true);
    }
  },
  components: {
    ClearChoicesDialog,
    ShareDialog,
    UpdateVoteTitleDialog
  },
  beforeRouteEnter(to, from, next) {
    console.log(this);
  }
};
</script>

<style lang="sass">
.vote-toolbar-info
  padding-left: 20px
  padding-right: 20px
  position: relative
  display: flex
  height: 100%
  flex-flow: column
  justify-content: center 
  white-space: nowrap
  text-overflow: ellipsis

.vote-toolbar-info:hover::before 
  opacity: 0.08

.vote-toolbar-info::before
  background-color: currentColor
  bottom: 0
  opacity: 0
  pointer-events: none
  position: absolute
  right: 0
  top: 0
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)

.vote-toolbar-title 
  font-size: 1.0625rem
  line-height: 1.4
  width: 160px
  white-space: nowrap
  text-overflow: ellipsis
  overflow-x: hidden

.vote-toolbar-status
  color: #bdbdbd
  font-size: 0.625em
  font-weight: 400
  line-height: 1.4

@media screen and (min-width: 1000px)
  .vote-toolbar-title 
    font-size: 1.1875rem
    line-height: 1.4
    width: 300px

  .vote-toolbar-status
    font-size: 0.625em
    line-height: 1.6

</style>