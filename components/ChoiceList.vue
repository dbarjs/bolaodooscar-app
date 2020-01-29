<template>
  <v-list v-if="choices">
    <v-list-item v-for="choice in orderedChoices" :key="choice.categoryId">
      <v-list-item-content>
        <v-list-item-title>{{ choice.nomineeName }}</v-list-item-title>
        <v-list-item-subtitle>{{ choice.category.name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    orderedChoices() {
      // order Choices using Category "order" property
      return Object.values(this.choices).sort((a, b) => {
        if (a.category.order < b.category.order) {
          return -1;
        } else if (a.category.order > b.category.order) {
          return 1;
        }
        return 0;
      });
    }
  },
  props: {
    choices: {
      required: true
    }
  }
};
</script>

<style></style>
