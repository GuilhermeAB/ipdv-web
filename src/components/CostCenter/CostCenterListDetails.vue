<template>
  <div>
    <v-data-table
      v-if='costCenter'
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='costCenter.departmentList'
      :footer-props='{
        itemsPerPageOptions: [10, 50, 100, 300, -1]
      }'
    >
      <template v-slot:top>
        <v-row no-gutters align='center'>
          <v-text-field
            v-model='search'
            :label='$t("SEARCH")'
            class='mx-4'
          />

          <v-btn depressed class='primary' @click='openDepartmentDialog()'>
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
            <v-btn small icon color='error' v-on='on' @click='removeDepartment(item)'>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          {{$t('REMOVE_DEPARTMENT')}}
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model='departmentDialog' persistent max-width='350'>
      <v-card v-if='departmentDialog' flat>
        <v-app-bar>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='closeDepartmentDialog()'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('DEPARTMENT')}}
          </div>
        </v-app-bar>

        <v-card-text>
          <v-autocomplete
            v-model='department'
            :items='departmentList'
            :label='$t("DEPARTMENT")'
            hide-details
            item-value='id'
            item-text='description'
          />
        </v-card-text>

        <v-card-actions>
          <v-btn block depressed class='primary' @click='addCostCenterDepartment'>
            {{$t('ADD')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { format, parseISO } from 'date-fns';
  import Swal from 'sweetalert2';

  export default {
    name: 'CostCenterListDetails',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data: function () {
      return {
        search: undefined,
        headers: [
          { text: this.$t('DESCRIPTION'), value: 'description' },
          { text: this.$t('CREATED_AT'), value: 'created_at' },
          { text: this.$t('UPDATED_AT'), value: 'updated_at' },
          { text: this.$t('ACTIONS'), value: 'actions', align: 'center' },
        ],
        departmentDialog: false,
        department: undefined,
        costCenter: undefined,
      };
    },
    mounted: function () {
      this.getData();
    },
    computed: {
      ...mapGetters('department', [
        'departmentList',
      ]),
    },
    methods: {
      ...mapActions('costCenter', [
        'deleteDepartment',
        'addDepartment',
        'getById',
      ]),
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
      openDepartmentDialog: function () {
        this.department = undefined;
        this.departmentDialog = true;
      },
      closeDepartmentDialog: function () {
        this.department = undefined;
        this.departmentDialog = false;
      },
      getData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        const result = await this.getById({ id: this.id });

        this.costCenter = result;
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
      removeDepartment: async function (department) {
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
        await this.deleteDepartment({ id: this.id, departmentId: department.id });
        await this.getData();
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
      addCostCenterDepartment: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.addDepartment({ id: this.id, departmentId: this.department });
        await this.getData();
        this.$forceUpdate();

        this.closeDepartmentDialog();
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
