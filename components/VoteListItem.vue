<template>
  <v-col cols="12" v-if="vote">
    <v-card>
      <choice-list :choices="vote.choices"></choice-list>
    </v-card>
  </v-col>
</template>

<script>
import ChoiceList from "~/components/ChoiceList.vue";
export default {
  props: {
    vote: {
      required: true,
      type: Object
    }
  },
  components: {
    ChoiceList
  }
};
</script>

<style>
</style>