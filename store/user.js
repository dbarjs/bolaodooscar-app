import { firestoreAction } from "vuexfire";
import { usersRef } from "~/firebase";

export const state = () => ({
  user: false
});

export const getters = {
  getUser: state => state.user
};

export const mutations = {
  setUser(state, user) {
    state.user = user ? user : false;
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
