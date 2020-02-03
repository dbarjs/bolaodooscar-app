import { firestoreAction } from "vuexfire";
import { usersRef } from "~/firebase";

export const state = () => ({
  user: false,
  isAuthStateVerified: false
});

export const getters = {
  getUser: state => state.user,
  isAuthStateVerified: state => state.isAuthStateVerified
};

export const mutations = {
  setUser(state, user) {
    state.user = user ? user : false;
  },
  setAuthStateVerifiedState(state, value = true) {
    state.isAuthStateVerified = !!value;
  }
};

export const actions = {
  bindUserRef: firestoreAction((context, uid) => {
    context.bindFirestoreRef("user", usersRef.doc(uid));
  }),
  unbindUserRef: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("user");
  })
};
