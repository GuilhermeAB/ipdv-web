<template>
  <div>
    <v-data-table
      class='mt-3'
      multi-sort
      :search='search'
      :headers='headers'
      :items='roleList'
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

          <v-btn depressed class='primary' @click='roleDialog = true'>
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
    </v-data-table>

    <v-dialog v-model='roleDialog' persistent max-width='350'>
      <v-card v-if='roleDialog' flat>
        <v-app-bar>
          <v-tooltip bottom>
            <template v-slot:activator='{ on }'>
              <v-btn icon v-on='on' @click.native='roleDialog = false'>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>{{$t('CLOSE')}}</span>
          </v-tooltip>

          <div class='text-h5 ml-2'>
            {{$t('ROLE')}}
          </div>
        </v-app-bar>

        <role-list-item @close='roleDialog = false' />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { format, parseISO } from 'date-fns';

  export default {
    name: 'RoleList',
    components: {
      RoleListItem: () => import('./RoleListItem.vue'),
    },
    data: function () {
      return {
        search: undefined,
        headers: [
          { text: this.$t('DESCRIPTION'), value: 'description' },
          { text: this.$t('CREATED_AT'), value: 'created_at' },
          { text: this.$t('UPDATED_AT'), value: 'updated_at' },
        ],
        roleDialog: false,
      };
    },
    computed: {
      ...mapGetters('role', [
        'roleList',
      ]),
    },
    methods: {
      formattedDateAndTime: function (value) {
        return value && format(parseISO(value), 'dd/MM/yyyy HH:mm');
      },
    },
  };
</script>
