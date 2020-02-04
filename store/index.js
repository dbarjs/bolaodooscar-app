import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  numberOfVotes: 0
});

export const mutations = {
  ...vuexfireMutations,
  setNumberOfVotes(state, value) {
    state.numberOfVotes = value ? value : 0;
  }
};

export const actions = {};
