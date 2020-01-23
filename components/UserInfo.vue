<template>
  <div v-if="user">
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="48">
          <v-img v-bind:src="user.providerData.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link two-line @click="toggleUserMenu">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ user.providerData.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            {{ user.providerData.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon v-if="showUserMenu">{{ icons.mdiMenuUp }}</v-icon>
          <v-icon v-if="!showUserMenu">{{ icons.mdiMenuDown }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped nav dense v-if="showUserMenu">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>{{ icons.mdiAccount }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Conta</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="signOut">
        <v-list-item-icon>
          <v-icon>{{ icons.mdiLogout }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sair</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mdiAccount, mdiLogout, mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { auth } from "~/firebase";
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    showUserMenu() {
      return this.$store.state.showUserMenu;
    }
  },
  data() {
    return {
      icons: {
        mdiAccount,
        mdiLogout,
        mdiMenuDown,
        mdiMenuUp
      }
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
    },
    toggleUserMenu() {
      this.$store.commit("toggleUserMenu");
    }
  }
};
</script>

<style></style>
