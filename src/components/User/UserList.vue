<template>
  <div>
    <v-data-table
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='userList'
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
            <v-btn small icon color='primary' v-on='on' @click='openUserDialog(item)'>
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          {{$t('EDIT')}}
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator='{ on }'>
            <v-btn small icon color='error' v-on='on' @click='removeUser(item)'>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          {{$t('REMOVE')}}
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

        <user-list-item :user='selectedUser' @close='closeUserDialog()' />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { format, parseISO } from 'date-fns';
  import Swal from 'sweetalert2';

  export default {
    name: 'UserList',
    components: {
      UserListItem: () => import('./UserListItem.vue'),
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
        userDialog: false,
        selectedUser: undefined,
      };
    },
    computed: {
      ...mapGetters('user', [
        'userList',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'deleteUser',
      ]),
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
      openUserDialog: function (item) {
        this.userDialog = true;
        this.selectedUser = item;
      },
      closeUserDialog: function () {
        this.userDialog = false;
        this.selectedUser = undefined;
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

        await this.deleteUser({ id: user.id });
        await this.$store.dispatch('department/getDepartmentList');
      },
    },
  };
</script>
