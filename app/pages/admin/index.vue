<template lang="pug">
.admin
  .heading Admin Page Navigation
  template(v-for="entity in entities")
    .admin__link(@click="handleNavigation(entity)")
      .link__icon.material-icons-outlined arrow_forward
      .link__text {{ entity }}
</template>
<script lang="ts" setup>
const entities = ['blog']

const handleNavigation = (entity: string) => {
  navigateTo(`/admin/${entity}`)
}

definePageMeta({
  layout: 'admin',
})
</script>
<script lang="ts">
export default {
  name: 'AdminIndexPage',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';
.admin {
  padding: 20px;

  .heading {
    @include font-family('roboto-slab');
    @include font($size: $font-xxxl);
    padding-bottom: 20px;
  }

  &__link {
    @include flex($justify: flex-start);
    width: fit-content;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid white;
      padding-bottom: 4px;
    }
  }

  .link {
    &__icon {
      margin-right: 8px;
    }

    &__text {
      @include font($size: $font-lg);
    }
  }
}
</style>
