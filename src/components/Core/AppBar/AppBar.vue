<template>
  <v-app-bar
    app
    color='primary'
    style='margin-bottom: 64px'
  >
    <v-tooltip bottom>
      <template v-slot:activator='{ on }'>
        <v-btn
          icon
          class='ml-2'
          v-on='on'
          @click='navigateTo(route.home)'
        >
          <v-icon color='#fff'>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
      {{$t('GO_TO_HOME')}}
    </v-tooltip>
  </v-app-bar>
</template>

<script>
  import { route } from '@/router';

  export default {
    name: 'AppBar',
    data: function () {
      return {
        route: route,
      };
    },
    methods: {
      navigateTo: function (name) {
        if (this.$router.currentRoute.name !== name) {
          this.$router.push({ name: name });
        }
      },
    },
  };
</script>
