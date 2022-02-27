<template>
  <div>
    bla
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'HomePage',
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
        await this.getUserList();
        await this.getCostCenterList();
        await this.getDepartmentList();
        await this.getRoleList();
      },
    },
  };
</script>
