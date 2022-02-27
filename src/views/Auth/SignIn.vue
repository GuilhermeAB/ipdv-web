<template>
  <v-container fluid>
    <v-dialog
      :value='!isAuthenticated'
      persistent
      max-width='450'
      max-height='450'
    >
      <v-card
        elevation='3'
        outlined
        max-width='450'
        height='300'
      >
        <v-container fluid fill-height justify='center' align='center'>
          <v-row justify='center' align='center'>
            <v-avatar color='primary' size='100'>
              <v-icon dark size='75'>
                mdi-account
              </v-icon>
            </v-avatar>
          </v-row>
          <v-row justify='center'>
            <h1>
              {{$t('SIGN_IN_TITLE')}}
            </h1>
          </v-row>
          <v-row justify='center' align='center'>
            <v-btn color='primary' @click='signIn'>
              {{$t('SIGN_IN')}}
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    name: 'SignIn',
    computed: {
      ...mapGetters('auth', [
        'isAuthenticated',
      ]),
    },
    methods: {
      signIn: async function () {
        this.$store.dispatch('loading/toggleLoading');

        await axios({
          url: '/auth',
          method: 'GET',
          withCredentials: true,
        });

        this.$store.dispatch('auth/handlerAuthentication', { value: true });
        this.$store.dispatch('loading/toggleLoading');
      },
    },
  };
</script>
