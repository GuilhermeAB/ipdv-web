<template>
  <v-row no-gutters align='center' justify='center'>
    <v-col
      cols='12'
      xs='6'
      sm='6'
      md='3'
      lg='3'
      xl='3'
    >
      <context-card-item
        :title='$t("USERS", { value: userList && userList.length || 0 })'
        icon='mdi-account'
        :is-active='selectedTab === 0'
        @click='selectedTab = 0'
      />
    </v-col>
    <v-col
      cols='12'
      xs='6'
      sm='6'
      md='3'
      lg='3'
      xl='3'
    >
      <context-card-item
        :title='$t("DEPARTMENTS", { value: departmentList && departmentList.length || 0 })'
        icon='mdi-account'
        :is-active='selectedTab === 1'
        @click='selectedTab = 1'
      />
    </v-col>
    <v-col
      cols='12'
      xs='6'
      sm='6'
      md='3'
      lg='3'
      xl='3'
    >
      <context-card-item
        :title='$t("COST_CENTERS", { value: costCenterList && costCenterList.length || 0 })'
        icon='mdi-account'
        :is-active='selectedTab === 2'
        @click='selectedTab = 2'
      />
    </v-col>
    <v-col
      cols='12'
      xs='6'
      sm='6'
      md='3'
      lg='3'
      xl='3'
    >
      <context-card-item
        :title='$t("ROLES", { value: roleList && roleList.length || 0 })'
        icon='mdi-account'
        :is-active='selectedTab === 3'
        @click='selectedTab = 3'
      />
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ContextCard',
    components: {
      ContextCardItem: () => import('./ContextCardItem.vue'),
    },
    props: {
      value: {
        type: Number,
        required: true,
      },
    },
    data: function () {
      return {
        selectedTab: 0,
      };
    },
    watch: {
      selectedTab: {
        handler: function () {
          this.$emit('input', this.selectedTab);
        },
      },
    },
    computed: {
      ...mapGetters('user', [
        'userList',
      ]),
      ...mapGetters('costCenter', [
        'costCenterList',
      ]),
      ...mapGetters('department', [
        'departmentList',
      ]),
      ...mapGetters('role', [
        'roleList',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  .bg-active {
    border: 2px solid var(--v-primary-lighten2) !important;
  }
</style>
