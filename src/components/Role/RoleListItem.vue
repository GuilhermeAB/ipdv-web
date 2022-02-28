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
      <v-btn block depressed class='primary' @click='addRole'>
        {{$t('SAVE')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'RoleListItem',
    data: function () {
      return {
        description: undefined,
      };
    },
    methods: {
      addRole: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.$store.dispatch('role/addRole', {
          description: this.description,
        });

        this.$emit('close');
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
