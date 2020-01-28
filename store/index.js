import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  currentChoices: {},
  showUserMenu: false
});

export const mutations = {
  ...vuexfireMutations,
  setCategoryVote(state, vote) {
    // Conditional to test if the Category has a choice
    if (
      JSON.stringify(state.currentChoices[vote.categoryId]) ===
      JSON.stringify(vote)
    ) {
      // remove the category choice
      Vue.delete(state.currentChoices, vote.categoryId);
    } else {
      // set the category choice
      Vue.set(state.currentChoices, vote.categoryId, vote);
    }
  },
  clearCurrentChoices(state) {
    state.currentChoices = {};
  },
  toggleUserMenu(state) {
    state.showUserMenu = !state.showUserMenu;
  }
};

export const actions = {
  bindCurrentChoices: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("currentChoices", false);
  })
};
