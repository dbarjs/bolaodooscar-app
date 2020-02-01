import { firestoreAction } from "vuexfire";
import { moviesRef } from "~/firebase";

export const state = () => ({
  movies: []
});

export const actions = {
  bindMoviesRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef("movies", moviesRef);
  })
};
