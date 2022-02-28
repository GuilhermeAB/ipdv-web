<template>
  <v-container fluid class='pa-0'>
    <v-row no-gutters align='center' justify='center'>
      <v-col
        cols='12'
        xs='12'
        sm='12'
        md='10'
        lg='10'
        xl='10'
      >
        <context-card v-model='selectedTab' />

        <user-list v-if='selectedTab === 0' />
        <department-list v-else-if='selectedTab === 1' />
        <cost-center-list v-else-if='selectedTab === 2' />
        <role-list v-else-if='selectedTab === 3' />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'HomePage',
    components: {
      ContextCard: () => import('../components/ContextCard/ContextCard.vue'),
      UserList: () => import('../components/User/UserList.vue'),
      DepartmentList: () => import('../components/Department/DepartmentList.vue'),
      CostCenterList: () => import('../components/CostCenter/CostCenterList.vue'),
      RoleList: () => import('../components/Role/RoleList.vue'),
    },
    data: function () {
      return {
        selectedTab: 0,
      };
    },
    computed: {
      ...mapGetters('auth', [
        'isAuthenticated',
      ]),
    },
    watch: {
      isAuthenticated: {
        handler: function () {
          if (this.isAuthenticated) {
            this.getData();
          }
        },
      },
    },
    mounted: function () {
      this.getData();
    },
    methods: {
      ...mapActions('user', [
        'getUserList',
      ]),
      ...mapActions('costCenter', [
        'getCostCenterList',
      ]),
      ...mapActions('department', [
        'getDepartmentList',
      ]),
      ...mapActions('role', [
        'getRoleList',
      ]),
      getData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });

        await this.getUserList();
        await this.getCostCenterList();
        await this.getDepartmentList();
        await this.getRoleList();

        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
