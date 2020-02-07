import Vue from "vue";
import { firestoreAction, vuexfireMutations } from "vuexfire";
import {
  votesRef,
  usersRef,
  moviesRef,
  categoriesRef,
  Timestamp,
  FieldValue
} from "~/firebase";

export const state = () => ({
  currentVote: false
});

export const getters = {
  getCurrentVote: state => state.currentVote,
  getCurrentVoteId: state => (state.currentVote ? state.currentVote.id : false),
  getChoices: state => (state.currentVote ? state.currentVote.choices : {}),
  getCurrentVoteOwnerId: state => {
    if (state.currentVote) {
      return state.currentVote.user
        ? state.currentVote.user.id
          ? state.currentVote.user.id
          : false
        : false;
    }
    return false;
  },
  getSelectedNominee(state) {
    // return nominee id
    return categoryId =>
      state.currentVote && categoryId
        ? state.currentVote.choices[categoryId]
          ? state.currentVote.choices[categoryId].nomineeId
          : false
        : false;
  }
};

export const mutations = {};

// verify if Choice Object is a valid
export function isChoice(choice) {
  return choice
    ? choice.movieId && choice.categoryId && choice.nomineeId
      ? true
      : false
    : false;
}

export const actions = {
  bindVoteRef: firestoreAction((context, voteId) => {
    return voteId
      ? context.bindFirestoreRef("currentVote", votesRef.doc(voteId))
      : false;
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
  updateUser: context => {
    try {
      // get active user (if exists):
      const user = context.rootGetters["user/getUser"];
      // return the ref current vote:
      votesRef.doc(context.state.currentVote.id).update({
        user: user ? usersRef.doc(user.id) : false,
        userId: user ? user.id : false
      });
    } catch (e) {
      console.log(e);
    }
  },
  addChoice: (context, choice) => {
    // verify if choice object is valid
    if (isChoice(choice)) {
      // normalize the choice object
      const newChoice = {
        ...choice,
        category: categoriesRef.doc(choice.categoryId),
        movie: moviesRef.doc(choice.movieId)
      };
      // verify if exists a active vote
      if (context.state.currentVote) {
        try {
          // put the choice on vote:
          votesRef.doc(context.state.currentVote.id).update({
            ["choices." + newChoice.categoryId]: newChoice,
            updated: Timestamp.now()
          });
        } catch (e) {
          console.log(e);
        }
        // verify if the vote has a userId
        if (!context.state.currentVote.userId) {
          context.dispatch("updateUser");
        }
      } else {
        try {
          // create a vote:
          context.dispatch("createVote").then(docRef => {
            // after create a vote, bind this:
            context.dispatch("bindVoteRef", docRef.id).then(vote => {
              // put the choice on vote:
              votesRef.doc(vote.id).update({
                ["choices." + newChoice.categoryId]: newChoice,
                updated: Timestamp.now()
              });
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  removeVote(context, categoryId) {
    const voteId = context.state.currentVote.id;
    if (categoryId && voteId) {
      votesRef.doc(voteId).update({
        ["choices." + categoryId]: FieldValue.delete(),
        updated: Timestamp.now()
      });
    }
  },
  clearChoices(context) {
    if (context.state.currentVote) {
      try {
        votesRef.doc(context.state.currentVote.id).update({
          choices: {}
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  shareVote(context) {
    if (context.getters.getCurrentVoteId) {
      const shareData = {
        title: "Bolão do Oscar",
        text: "Veja minhas apostas para o Oscar 2020!",
        url:
          "https://bolaodooscar.web.app/vote/" +
          context.getters.getCurrentVoteId
      };
      try {
        // Try to use the native share API
        navigator.share(shareData);
      } catch (err) {
        // if not allowed, open the Share Dialog
        context.commit("setShareDialog", true, { root: true });
      }
    }
  }
};
