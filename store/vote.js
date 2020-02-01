import { firestoreAction } from "vuexfire";
import {
  votesRef,
  usersRef,
  moviesRef,
  categoriesRef,
  Timestamp
} from "~/firebase";

export const state = () => ({
  currentVote: false
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
  bindVoteRef: firestoreAction((context, voteId) => {
    console.log(voteId);
    return context.bindFirestoreRef("currentVote", votesRef.doc(voteId));
  }),
  unbindVoteRef: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("currentVote");
  }),
  async createVote(context) {
    try {
      // get active user (if exists):
      const user = context.rootGetters["user/getUser"];
      // return the ref current vote:
      return votesRef.add({
        user: user ? usersRef.doc(user.id) : false,
        userId: user ? user.id : false,
        created: Timestamp.now(),
        choices: {}
      });
    } catch (e) {
      console.log(e);
    }
    return false;
  },
  addChoice: (context, choice) => {
    // normalize the choice object
    const newChoice = {
      ...choice,
      category: categoriesRef.doc(choice.categoryId),
      movie: moviesRef.doc(choice.movieId)
    };
    // verify if exists a active vote
    if (context.state.currentVote) {
      // put the choice on vote:
      votesRef.doc(context.state.currentVote.id).update({
        ["choices." + newChoice.categoryId]: newChoice
      });
    } else {
      try {
        // create a vote:
        context.dispatch("createVote").then(docRef => {
          // after create a vote, bind this:
          context.dispatch("bindVoteRef", docRef.id).then(vote => {
            // put the choice on vote:
            votesRef.doc(vote.id).update({
              ["choices." + newChoice.categoryId]: newChoice
            });
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
