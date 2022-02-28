<template>
  <v-col cols='12' sm='4'>
    <v-file-input
      v-model='file'
      :label='$t("IMPORT_BY_FILE")'
      hide-details
      outlined
      dense
      clearable
      @change='uploadFile'
    />
  </v-col>
</template>

<script>
  import axios from 'axios';
  import { mapActions } from 'vuex';

  export default {
    name: 'ImportFile',
    data: function () {
      return {
        file: undefined,
      };
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
      uploadFile: async function () {
        if (!this.file) {
          return;
        }

        this.$store.dispatch('loading/toggleLoading', { value: true });

        const formData = new FormData();
        formData.append('file', this.file);

        await axios({
          url: '/import',
          method: 'POST',
          withCredentials: true,
          data: formData,
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });

        this.file = undefined;
        await this.getData();

        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
      getData: async function () {
        await this.getUserList();
        await this.getCostCenterList();
        await this.getDepartmentList();
        await this.getRoleList();
      },
    },
  };
</script>
