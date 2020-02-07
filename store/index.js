import { vuexfireMutations } from "vuexfire";

export const state = () => ({
  numberOfVotes: 0,
  drawer: false,
  clearChoicesDialog: false,
  shareDialog: false,
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
  },
  setDrawer(state, value) {
    state.drawer = !!value;
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  showDrawer(state) {
    state.drawer = true;
  },
  hideDrawer(state) {
    state.drawer = false;
  },
  setClearChoicesDialog(state, value) {
    state.clearChoicesDialog = !!value;
  },
  setShareDialog(state, value) {
    state.shareDialog = !!value;
  }
};

export const actions = {};
