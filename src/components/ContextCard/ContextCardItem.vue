<template>
  <v-card
    elevation='1'
    width='98%'
    height='130px'
    class='mt-2'
    :class='{ "bg-active": isActive }'
    @click='$emit("click")'
  >
    <v-card-text>
      <v-row no-gutters align='center' justify='center'>
        <v-avatar :class='{ primary: isActive }'>
          <v-icon :dark='isActive'>
            {{icon}}
          </v-icon>
        </v-avatar>
      </v-row>

      <v-row no-gutters align='center' justify='center'>
        <span class='mt-3'>
          {{title}}
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'ContextCardItem',
    props: {
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .bg-active {
    border: 2px solid var(--v-primary-lighten2) !important;
  }
</style>
