<template>
  <div class="pt-12">
    <header class="">
      <v-container class="d-flex flex-column align-center">
        <v-img class="logo" src="bdo-logo.png" max-width="300"></v-img>
        <v-btn color="my-6 success" to="/vote">Faça sua Aposta!</v-btn>
      </v-container>
    </header>
  </div>
</template>

<script>
export default {
  transition: "page"
};
</script>

<style scoped>
.page-enter-active {
  animation: acrossIn 0.2s ease-in both;
}
.page-leave-active {
  animation: acrossOut 0.2s ease-in both;
}
@keyframes acrossIn {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes acrossOut {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
