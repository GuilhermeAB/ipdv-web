<template>
  <div>
    <v-data-table
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='costCenterList'
      :footer-props='{
        itemsPerPageOptions: [10, 50, 100, 300, -1]
      }'
    >
      <template v-slot:top>
        <v-row no-gutters align='center' @click='openCostCenterDialog'>
          <v-text-field
            v-model='search'
            :label='$t("SEARCH")'
            class='mx-4'
          />

          <v-btn depressed class='primary'>
            <v-tooltip bottom>
              <template v-slot:activator='{ on }'>
                <v-icon depressed v-on='on'>
                  mdi-plus
                </v-icon>
              </template>
              {{$t('ADD')}}
            </v-tooltip>
          </v-btn>
        </v-row>
      </template>

      <template v-slot:[`item.departmentList`]='{ item }'>
        <span>
          {{item.departmentList.length || 0}}
        </span>
      </template>

      <template v-slot:[`item.created_at`]='{ item }'>
        <span>
          {{formattedDateAndTime(item.created_at)}}
        </span>
      </template>

      <template v-slot:[`item.updated_at`]='{ item }'>
        <span>
          {{item.updated_at ? formattedDateAndTime(item.updated_at) : '---'}}
        </span>
      </template>

      <template v-slot:[`item.actions`]='{ item }'>
        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='primary' v-on='on' @click='openCostCenterDetailsDialog(item)'>
              <v-icon small>
                mdi-eye
              </v-icon>
            </v-btn>
          </template>
          {{$t('DETAILS')}}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='primary' v-on='on' @click='openCostCenterDialog(item)'>
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          {{$t('EDIT')}}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='error' v-on='on' @click='removeCostCenter(item)'>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          {{$t('REMOVE')}}
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model='costCenterDialog' persistent max-width='350'>
      <v-card v-if='costCenterDialog' flat>
        <v-app-bar>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='closeCostCenterDialog()'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('COST_CENTER')}}
          </div>
        </v-app-bar>

        <cost-center-list-item :cost-center='selectedCostCenter' @close='closeCostCenterDialog()' />
      </v-card>
    </v-dialog>

    <v-dialog v-model='costCenterDetailsDialog' fullscreen persistent>
      <v-card v-if='costCenterDetailsDialog' flat>
        <v-app-bar dark color='primary'>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='closeCostCenterDetailsDialog()'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('COST_CENTER')}}
          </div>
        </v-app-bar>

        <v-row no-gutters align='center' justify='center'>
          <v-col
            cols='12'
            xs='12'
            sm='12'
            md='10'
            lg='10'
            xl='10'
          >
            <cost-center-list-details
              :id='selectedCostCenter.id'
              @close='closeCostCenterDetailsDialog()'
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { format, parseISO } from 'date-fns';
  import Swal from 'sweetalert2';

  export default {
    name: 'CostCenterList',
    components: {
      CostCenterListItem: () => import('./CostCenterListItem.vue'),
      CostCenterListDetails: () => import('./CostCenterListDetails.vue'),
    },
    data: function () {
      return {
        search: undefined,
        headers: [
          { text: this.$t('DESCRIPTION'), value: 'description' },
          { text: this.$t('DEPARTMENTS_NUMBER'), value: 'departmentList' },
          { text: this.$t('CREATED_AT'), value: 'created_at' },
          { text: this.$t('UPDATED_AT'), value: 'updated_at' },
          { text: this.$t('ACTIONS'), value: 'actions' },
        ],
        costCenterDialog: false,
        costCenterDetailsDialog: false,
        selectedCostCenter: undefined,
      };
    },
    computed: {
      ...mapGetters('costCenter', [
        'costCenterList',
      ]),
    },
    methods: {
      ...mapActions('costCenter', [
        'deleteCostCenter',
      ]),
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
      openCostCenterDialog: function (item) {
        this.costCenterDialog = true;
        this.selectedCostCenter = item;
      },
      closeCostCenterDialog: function () {
        this.costCenterDialog = false;
        this.selectedCostCenter = undefined;
      },
      openCostCenterDetailsDialog: function (item) {
        this.costCenterDetailsDialog = true;
        this.selectedCostCenter = item;
      },
      closeCostCenterDetailsDialog: function () {
        this.costCenterDetailsDialog = false;
        this.selectedCostCenter = undefined;
      },
      removeCostCenter: async function (costCenter) {
        const result = await Swal.fire({
          title: this.$t('WARNING'),
          text: this.$t('REALLY_WANT_PROCEED'),
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: this.$t('CANCEL'),
          confirmButtonText: this.$t('CONFIRM'),
        });

        if (!result.value) {
          return;
        }

        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.deleteCostCenter({ id: costCenter.id });
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
