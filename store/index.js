import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  numberOfVotes: 0,
  windowSize: {
    x: 0,
    y: 0
  }
});

export const mutations = {
  ...vuexfireMutations,
  setNumberOfVotes(state, value) {
    state.numberOfVotes = value ? value : 0;
  },
  setWindowSize(state, value) {
    state.windowSize = value;
  }
};

export const actions = {};
