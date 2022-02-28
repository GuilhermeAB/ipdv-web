<template>
  <v-app>
    <loading-full-screen />
    <v-main>
      <app-bar />
      <sign-in />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      LoadingFullScreen: () => import('./components/Core/LoadingFullScreen/LoadingFullScreen.vue'),
      AppBar: () => import('./components/Core/AppBar/AppBar.vue'),
      SignIn: () => import('./views/Auth/SignIn.vue'),
    },
  };
</script>

<style lang='scss'>
  .swal2-confirm {
  background-color: var(--v-primary-base) !important;
}

  .swal2-cancel {
    background: none !important;
    color: var(--v-error-base) !important;
  }
</style>
