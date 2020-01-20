<template>
  <div>
    <header class="py-6">
      <v-container class="d-flex flex-row justify-center">
        <v-img class="logo" src="bdo-logo.png" max-width="300"></v-img>
      </v-container>
    </header>
    <category-list></category-list>
  </div>
</template>

<script>
import CategoryList from "~/components/CategoryList.vue";
export default {
  components: {
    CategoryList
  }
};
</script>
