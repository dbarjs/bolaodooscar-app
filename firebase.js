import firebaseConfig from "./firebaseConfig";
import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

export default firebase.initializeApp(firebaseConfig);

// Auth
export const auth = firebase.auth();
export const authProviders = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider()
};

// Firestore
export const database = firebase.firestore();
export const categoriesRef = database.collection("categories");
export const moviesRef = database.collection("movies");
export const votesRef = database.collection("votes");
