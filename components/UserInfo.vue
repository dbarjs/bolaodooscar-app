<template>
  <div>
    <v-list v-if="user">
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-bind:src="user.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link two-line>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
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
    </v-list>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      mdiAccount
    };
  }
};
</script>

<style></style>
