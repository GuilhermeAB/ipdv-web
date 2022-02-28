<template>
  <div>
    <v-data-table
      v-if='department'
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='department.usersList'
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

          <v-btn depressed class='primary' @click='openUserDialog()'>
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
            <v-btn small icon color='error' v-on='on' @click='removeUser(item)'>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          {{$t('REMOVE_USER')}}
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model='userDialog' persistent max-width='350'>
      <v-card v-if='userDialog' flat>
        <v-app-bar>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='closeUserDialog()'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('USER')}}
          </div>
        </v-app-bar>

        <v-card-text>
          <v-autocomplete
            v-model='user'
            :items='userList'
            :label='$t("USER")'
            hide-details
            item-value='id'
            item-text='name'
          />
        </v-card-text>

        <v-card-actions>
          <v-btn block depressed class='primary' @click='addDepartmentUser'>
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
    name: 'DepartmentListDetails',
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
          { text: this.$t('NAME'), value: 'name' },
          { text: this.$t('ROLE'), value: 'role_description' },
          { text: this.$t('CREATED_AT'), value: 'created_at' },
          { text: this.$t('UPDATED_AT'), value: 'updated_at' },
          { text: this.$t('ACTIONS'), value: 'actions', align: 'center' },
        ],
        user: undefined,
        userDialog: false,
        department: undefined,
      };
    },
    mounted: function () {
      this.getData();
    },
    computed: {
      ...mapGetters('user', [
        'userList',
      ]),
    },
    methods: {
      ...mapActions('department', [
        'deleteUser',
        'addUser',
        'getById',
      ]),
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
      openUserDialog: function () {
        this.user = undefined;
        this.userDialog = true;
      },
      closeUserDialog: function () {
        this.user = undefined;
        this.userDialog = false;
      },
      getData: async function () {
        const result = await this.getById({ id: this.id });

        this.department = result;
      },
      removeUser: async function (user) {
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
        await this.deleteUser({ id: this.id, userId: user.id });
        await this.getData();
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
      addDepartmentUser: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.addUser({ id: this.id, userId: this.user });
        await this.getData();
        this.$forceUpdate();

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.closeUserDialog();
      },
    },
  };
</script>
