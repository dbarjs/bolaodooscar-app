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

// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   mutations: {
//     ...vuexfireMutations,

// });
