import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  user: false
});

export const mutations = {
  ...vuexfireMutations,
  setUser(state, user) {
    state.user = user ? user : false;
  }
};
