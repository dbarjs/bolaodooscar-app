<template>
  <div v-if="user">
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-bind:src="user.providerData.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link two-line>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.providerData.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            user.providerData.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>{{ mdiAccount }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Conta</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="signOut">
        <v-list-item-icon>
          <v-icon>{{ mdiLogout }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sair</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mdiAccount, mdiLogout } from "@mdi/js";
import { auth } from "~/firebase";
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  data() {
    return {
      mdiAccount,
      mdiLogout
    };
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
