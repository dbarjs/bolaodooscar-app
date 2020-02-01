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
  animation: acrossIn 1s ease-in;
}
.page-leave-active {
  animation: acrossOut 1s ease-out;
}
@keyframes acrossIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes acrossOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
