import { firestoreAction } from "vuexfire";
import { categoriesRef } from "~/firebase";

export const state = () => {
  categories: [];
};

export const getters = {
  getCategoryList: state => state.categories
};

export const actions = {
  bindCategoriesRef: firestoreAction(context => {
    context.bindFirestoreRef(
      "categories",
      categoriesRef.orderBy("order", "asc")
    );
  })
};
