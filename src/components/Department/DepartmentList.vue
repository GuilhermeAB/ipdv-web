<template>
  <div>
    <v-data-table
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='departmentList'
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

      <template v-slot:[`item.userList`]='{ item }'>
        <span>
          {{item.userList.length || 0}}
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
            <v-btn small icon color='primary' v-on='on' @click='openDepartmentDetailsDialog(item)'>
              <v-icon small>
                mdi-eye
              </v-icon>
            </v-btn>
          </template>
          {{$t('DETAILS')}}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='primary' v-on='on' @click='openDepartmentDialog(item)'>
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          {{$t('EDIT')}}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='error' v-on='on' @click='removeDepartment(item)'>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          {{$t('REMOVE')}}
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

        <department-list-item :department='selectedDepartment' @close='closeDepartmentDialog()' />
      </v-card>
    </v-dialog>

    <v-dialog v-model='departmentDetailsDialog' fullscreen persistent>
      <v-card v-if='departmentDetailsDialog' flat>
        <v-app-bar dark color='primary'>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='closeDepartmentDetailsDialog()'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('DEPARTMENT')}}
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
            <department-list-details
              :id='selectedDepartment.id'
              @close='closeDepartmentDetailsDialog()'
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
    name: 'DepartmentList',
    components: {
      DepartmentListItem: () => import('./DepartmentListItem.vue'),
      DepartmentListDetails: () => import('./DepartmentListDetails.vue'),
    },
    data: function () {
      return {
        search: undefined,
        headers: [
          { text: this.$t('DESCRIPTION'), value: 'description' },
          { text: this.$t('USERS_NUMBER'), value: 'userList' },
          { text: this.$t('CREATED_AT'), value: 'created_at' },
          { text: this.$t('UPDATED_AT'), value: 'updated_at' },
          { text: this.$t('ACTIONS'), value: 'actions' },
        ],
        departmentDialog: false,
        departmentDetailsDialog: false,
        selectedDepartment: undefined,
      };
    },
    computed: {
      ...mapGetters('department', [
        'departmentList',
      ]),
    },
    methods: {
      ...mapActions('department', [
        'deleteDepartment',
      ]),
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
      openDepartmentDialog: function (item) {
        this.departmentDialog = true;
        this.selectedDepartment = item;
      },
      closeDepartmentDialog: function () {
        this.departmentDialog = false;
        this.selectedDepartment = undefined;
      },
      openDepartmentDetailsDialog: function (item) {
        this.departmentDetailsDialog = true;
        this.selectedDepartment = item;
      },
      closeDepartmentDetailsDialog: function () {
        this.departmentDetailsDialog = false;
        this.selectedDepartment = undefined;
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
        await this.deleteDepartment({ id: department.id });
        await this.$store.dispatch('costCenter/getCostCenterList');
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
