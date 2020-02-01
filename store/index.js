import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";

export const state = () => ({
  showUserMenu: false
});

export const mutations = {
  ...vuexfireMutations,
  toggleUserMenu(state) {
    state.showUserMenu = !state.showUserMenu;
  }
};

export const actions = {};
