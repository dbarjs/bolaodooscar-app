<template>
  <v-container v-if="user">
    <div class="my-3">
      <v-btn @click="signOut" block color="red">
        Sair
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { auth } from "~/firebase";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    signOut() {
      auth
        .signOut()
        .then(function() {
          console.warn("Signed Out!");
        })
        .catch(function(error) {
          console.warn("Sign Out Error" + error);
        });
    }
  }
};
</script>

<style></style>
