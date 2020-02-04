<template>
  <div v-if="user">
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="48">
          <v-img v-bind:src="user.providerData.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item link two-line>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ user.providerData.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
            {{ user.providerData.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mdiAccount, mdiLogout, mdiMenuDown, mdiMenuUp } from "@mdi/js";
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
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
    }
  }
};
</script>

<style></style>
