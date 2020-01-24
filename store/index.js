import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  currentVote: {},
  showUserMenu: false
});

export const mutations = {
  ...vuexfireMutations,
  setCategoryVote(state, vote) {
    // Conditional to test if the Category has a vote
    if (
      JSON.stringify(state.currentVote[vote.categoryId]) ===
      JSON.stringify(vote)
    ) {
      // remove the category vote
      Vue.delete(state.currentVote, vote.categoryId);
    } else {
      // set the category vote
      Vue.set(state.currentVote, vote.categoryId, vote);
    }
  },
  clearCurrentVote(state) {
    state.currentVote = {};
  },
  toggleUserMenu(state) {
    state.showUserMenu = !state.showUserMenu;
  }
};

export const actions = {
  bindCurrentVote: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("currentVote", false);
  })
};
