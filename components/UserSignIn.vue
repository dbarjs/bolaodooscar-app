<template>
  <v-card
    outlined
    color="#212121"
    v-if="!user"
    class="px-2 d-flex flex-column align-center"
  >
    <v-progress-circular
      class="py-6"
      v-if="!isAuthStateVerified"
      indeterminate
      color="primary"
      size="70"
    ></v-progress-circular>
    <div
      class="user-sign-in d-flex flex-column"
      :class="{ active: !user && isAuthStateVerified }"
    >
      <p class="text-center pt-3 mb-0">Entre para começar:</p>
      <div class="my-3">
        <v-btn
          class="btn--google"
          @click="signInWithGoogle"
          :loading="loading.google"
          :disabled="loading.google"
          block
          color="white"
        >
          <img class="google-logo" src="/google.svg" />
          Log In Com Google
          <template v-slot:loading.google>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
      </div>
      <div class="my-0">
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
    </div>
  </v-card>
</template>

<script>
import { auth, authProviders } from "~/firebase";
import { mdiFacebookBox, mdiGoogle, mdiTwitter } from "@mdi/js";
export default {
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
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    isAuthStateVerified() {
      return this.$store.getters["user/isAuthStateVerified"];
    }
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
      auth.signInWithRedirect(authProviders.twitter);
    }
  }
};
</script>

<style>
.user-sign-in {
  opacity: 0;
  transition: all 0.6s 0.3s ease-in;
}

.user-sign-in.active {
  opacity: 1;
}

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
