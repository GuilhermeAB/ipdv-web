<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model='description'
        :label='$t("DESCRIPTION")'
        hide-details
      />
    </v-card-text>

    <v-card-actions>
      <v-btn block depressed class='primary' @click='saveDepartment'>
        {{$t('SAVE')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex';
  import { clone } from 'lodash';

  export default {
    name: 'DepartmentListItem',
    props: {
      department: {
        type: Object,
        default: () => ({
          id: undefined,
          description: undefined,
          userList: undefined,
          created_at: undefined,
          updated_at: undefined,
        }),
      },
    },
    data: function () {
      return {
        description: undefined,
      };
    },
    mounted: function () {
      if (this.department && this.department.id) {
        this.description = clone(this.department.description);
      }
    },
    methods: {
      ...mapActions('department', [
        'updateDepartment',
        'addDepartment',
      ]),
      saveDepartment: async function () {
        if (this.department && this.department.id) {
          this.updateDepartmentData();
        } else {
          this.addNewDepartment();
        }
      },
      updateDepartmentData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.updateDepartment({
          id: this.department.id,
          description: this.description,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
      addNewDepartment: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.addDepartment({
          description: this.description,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
    },
  };
</script>
