<template>
  <v-list-item v-if="choice">
    <v-list-item-content>
      <v-list-item-title>
        <span>{{ choice.nomineeName }}</span>
        <v-chip class="ml-1" v-if="isWinner" label small light color="#f5c518">
          <span class="font-weight-bold">Vencedor</span>
        </v-chip>
        <v-chip
          class="ml-1"
          v-else-if="hasWinner"
          label
          outlined
          small
          color="red darken-0"
        >
          <span class="font-weight-bold">Não acertou</span>
        </v-chip>
      </v-list-item-title>
      <v-list-item-subtitle v-if="choice.category">
        {{ choice.category.shortName }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  computed: {
    isWinner() {
      try {
        return this.choice.category.winner.id === this.choice.nomineeId;
      } catch (e) {
        return false;
      }
    },
    hasWinner() {
      try {
        return this.choice.category.winner;
      } catch (e) {
        return false;
      }
    }
  },
  props: {
    choice: {
      required: true,
      type: Object
    }
  }
};
</script>

<style></style>
