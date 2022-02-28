<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model='name'
        :label='$t("NAME")'
        hide-details
      />
      <v-autocomplete
        v-model='role'
        :items='roleList'
        :label='$t("ROLE")'
        hide-details
        item-value='id'
        item-text='description'
      />
    </v-card-text>

    <v-card-actions>
      <v-btn block depressed class='primary' @click='saveUser'>
        {{$t('SAVE')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { clone } from 'lodash';

  export default {
    name: 'UserListItem',
    props: {
      user: {
        type: Object,
        default: () => ({
          id: undefined,
          name: undefined,
          role_id: undefined,
          role_description: undefined,
          created_at: undefined,
          updated_at: undefined,
        }),
      },
    },
    data: function () {
      return {
        name: undefined,
        role: undefined,
      };
    },
    mounted: function () {
      if (this.user && this.user.id) {
        this.name = clone(this.user.name);
        this.role = clone(this.user.role_id);
      }
    },
    computed: {
      ...mapGetters('role', [
        'roleList',
      ]),
    },
    methods: {
      ...mapActions('user', [
        'updateUser',
        'addUser',
      ]),
      saveUser: async function () {
        if (this.user && this.user.id) {
          this.updateUserData();
        } else {
          this.addNewUser();
        }
      },
      updateUserData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.updateUser({
          id: this.user.id,
          name: this.name,
          roleId: this.role,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
      addNewUser: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.addUser({
          name: this.name,
          roleId: this.role,
        });

        this.$store.dispatch('loading/toggleLoading', { value: false });
        this.$emit('close');
      },
    },
  };
</script>
