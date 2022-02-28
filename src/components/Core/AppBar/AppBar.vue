<template>
  <v-app-bar
    app
    dark
    color='primary'
    style='margin-bottom: 64px'
  >
    {{$t('APP_NAME')}}

    <v-spacer />

    <import-file />
  </v-app-bar>
</template>

<script>
  import { route } from '@/router';

  export default {
    name: 'AppBar',
    components: {
      ImportFile: () => import('../../ImportFile/ImportFile.vue'),
    },
    data: function () {
      return {
        route: route,
      };
    },
  };
</script>
