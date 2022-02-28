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
      <v-btn block depressed class='primary' @click='saveCostCenter'>
        {{$t('SAVE')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex';
  import { clone } from 'lodash';

  export default {
    name: 'CostCenterListItem',
    props: {
      costCenter: {
        type: Object,
        default: () => ({
          id: undefined,
          description: undefined,
          departmentList: undefined,
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
      if (this.costCenter && this.costCenter.id) {
        this.description = clone(this.costCenter.description);
      }
    },
    methods: {
      ...mapActions('costCenter', [
        'updateCostCenter',
        'addCostCenter',
      ]),
      saveCostCenter: async function () {
        if (this.costCenter && this.costCenter.id) {
          this.updateCostCenterData();
        } else {
          this.addNewCostCenter();
        }
      },
      updateCostCenterData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.updateCostCenter({
          id: this.costCenter.id,
          description: this.description,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
      addNewCostCenter: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.addCostCenter({
          description: this.description,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
    },
  };
</script>
