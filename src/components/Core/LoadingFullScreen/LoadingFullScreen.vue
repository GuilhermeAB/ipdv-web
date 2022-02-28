<template>
  <v-dialog
    v-model='isLoading'
    persistent
    width='300'
    style='z-index: 999999999;'
  >
    <v-card
      flat
      color='transparent'
    >
      <v-card-text>
        <v-row no-gutters align='center' justify='center'>
          <!-- <v-progress-circular color='primary' indeterminate size='64' /> -->
          <v-avatar size='187' rounded>
            <v-progress-circular
              indeterminate
              color='primary'
            />
          </v-avatar>
        </v-row>
        <v-row no-gutters align='center' justify='center' class='mt-3'>
          <span class='title white--text font-weight-regular'>
            {{$t('LOADING')}}
          </span>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LoadingFullScreen',
    computed: {
      ...mapGetters('loading', [
        'isLoading',
      ]),
    },
    mounted: function () {
      setInterval(() => {
        if (this.isLoading) {
          this.$store.dispatch('loading/toggleLoading', { value: false });
        }
      }, 3000);
    },
  };
</script>

<style lang='scss' scoped>
  ::v-deep .v-dialog {
    box-shadow: none !important;
  }
</style>
