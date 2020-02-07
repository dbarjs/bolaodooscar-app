<template>
  <v-list shaped nav dense v-if="user">
    <!-- <v-list-item link>
      <v-list-item-icon>
        <v-icon>{{ icons.mdiAccount }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Conta</v-list-item-title>
    </v-list-item> -->
    <v-list-item to="/votes" dark>
      <v-list-item-icon>
        <v-icon>{{ icons.mdiCheckboxMultipleMarked }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        <span>Minhas Apostas</span>
      </v-list-item-title>
    </v-list-item>
    <v-list-item link @click="signOut">
      <v-list-item-icon>
        <v-icon>{{ icons.mdiLogout }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Sair</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import UserInfo from "~/components/UserInfo.vue";
import UserSignIn from "~/components/UserSignIn.vue";
import { mdiAccount, mdiLogout, mdiCheckboxMultipleMarked } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        mdiAccount,
        mdiLogout,
        mdiCheckboxMultipleMarked
      }
    };
  },
  computed: {
    isAuthStateVerified() {
      return this.$store.getters["user/isAuthStateVerified"];
    },
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  methods: {
    signOut() {
      this.$store
        .dispatch("user/signOut")
        .then(function() {
          console.warn("Signed Out!");
        })
        .catch(function(error) {
          console.warn("Sign Out Error" + error);
        });
    }
  },
  components: {
    UserInfo,
    UserSignIn
  }
};
</script>

<style></style>
