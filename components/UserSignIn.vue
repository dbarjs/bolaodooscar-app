<template>
  <v-container v-if="!user">
    <div class="my-3">
      <v-btn
        class="btn--google"
        @click="signInWithGoogle"
        :loading="loading.google"
        :disabled="loading.google"
        block
        color="white"
      >
        <img class="google-logo" src="google.svg" />
        Log In Com Google
        <template v-slot:loading.google>
          <span class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
    <div class="my-3">
      <v-btn
        @click="signInWithFacebook"
        :loading="loading.facebook"
        :disabled="loading.facebook"
        block
        color="#3b5999"
      >
        <v-icon left>{{ icons.mdiFacebookBox }}</v-icon>
        Log In Com Facebook
        <template v-slot:loading.facebook>
          <span class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
    <div class="my-3">
      <v-btn
        @click="signInWithTwitter"
        :loading="loading.twitter"
        :disabled="loading.twitter"
        block
        color="#55acee"
      >
        <v-icon left>{{ icons.mdiTwitter }}</v-icon>
        Log In Com Twitter
        <template v-slot:loading.twitter>
          <span class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { auth, authProviders } from "~/firebase";
import { mdiFacebookBox, mdiGoogle, mdiTwitter } from "@mdi/js";
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    }
  },
  data() {
    return {
      icons: {
        mdiFacebookBox,
        mdiGoogle,
        mdiTwitter
      },
      loading: {
        google: false,
        facebook: false,
        twitter: false
      }
    };
  },
  methods: {
    signInWithGoogle() {
      this.loading.google = true;
      auth.signInWithRedirect(authProviders.google);
    },
    signInWithFacebook() {
      this.loading.facebook = true;
      auth.signInWithRedirect(authProviders.facebook);
    },
    signInWithTwitter() {
      this.loading.twitter = true;
      // auth.signInWithRedirect(authProviders.facebook);
    }
  }
};
</script>

<style>
.btn--google {
  color: rgba(0, 0, 0, 0.87) !important;
}

.google-logo {
  height: 1.125em;
  width: 1.125em;
  margin-right: 8px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
