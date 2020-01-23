<template>
  <div>
    <user-info></user-info>
    <user-sign-in></user-sign-in>
  </div>
</template>

<script>
import { auth, usersRef } from "~/firebase";
import UserInfo from "~/components/UserInfo.vue";
import UserSignIn from "~/components/UserSignIn.vue";
export default {
  methods: {
    onAuthStateChanged(user) {
      if (user) {
        if (user.providerData[0]) {
          // set "user" data on Firestore
          usersRef.doc(user.uid).set({
            uid: user.uid,
            providerData: user.providerData[0]
          });
          // bind user data (Vuex)
          this.$store.dispatch("user/bindUserRef", user.uid);
        }
      } else {
        // unbind user data (Vuex) and set to null
        this.$store.dispatch("user/unbindUserRef");
      }
    }
  },
  created() {
    auth.onAuthStateChanged(this.onAuthStateChanged);
  },
  components: {
    UserInfo,
    UserSignIn
  }
};
</script>

<style></style>
