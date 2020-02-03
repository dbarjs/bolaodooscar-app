<template>
  <div>
    <user-info></user-info>
    <user-sign-in></user-sign-in>
  </div>
</template>

<script>
import UserInfo from "~/components/UserInfo.vue";
import UserSignIn from "~/components/UserSignIn.vue";
export default {
  computed: {
    isAuthStateVerified() {
      return this.$store.getters["user/isAuthStateVerified"];
    }
  },
  components: {
    UserInfo,
    UserSignIn
  }
};
</script>

<style></style>
