<template>
  <div>
    <user-info></user-info>
    <user-sign-in></user-sign-in>
    <user-sign-out></user-sign-out>
  </div>
</template>

<script>
import { auth } from "~/firebase";
import UserInfo from "~/components/UserInfo.vue";
import UserSignIn from "~/components/UserSignIn.vue";
import UserSignOut from "~/components/UserSignOut.vue";
export default {
  methods: {
    onAuthStateChanged(user) {
      if (user) {
        if (user.providerData[0]) {
          this.$store.commit("setUser", user.providerData[0]);
        }
      } else {
        this.$store.commit("setUser", false);
      }
    }
  },
  created() {
    auth.onAuthStateChanged(this.onAuthStateChanged);
  },
  components: {
    UserInfo,
    UserSignIn,
    UserSignOut
  }
};
</script>

<style></style>
