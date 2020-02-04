import { firestoreAction } from "vuexfire";
import { auth, usersRef } from "~/firebase";

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
  }),
  verifyAuthState: context => {
    auth.onAuthStateChanged(user => {
      context.commit("setAuthStateVerifiedState", true);
      if (user) {
        if (user.providerData[0]) {
          // set "user" data on Firestore
          usersRef.doc(user.uid).set({
            uid: user.uid,
            providerData: user.providerData[0]
          });
          // bind user data (Vuex)
          context.dispatch("bindUserRef", user.uid);
        }
      } else {
        // unbind user data (Vuex) and set to null
        context.dispatch("unbindUserRef");
      }
    });
  },
  async signOut(context) {
    return auth.signOut();
  }
};
