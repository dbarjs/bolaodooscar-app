<template>
  <v-list-item v-if="choice">
    <v-list-item-content>
      <v-list-item-title>{{ choice.nomineeName }}</v-list-item-title>
      <v-list-item-subtitle v-if="choice.category">
        {{ choice.category.name }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    choice: {
      required: true,
      type: Object
    }
  }
};
</script>

<style></style>
