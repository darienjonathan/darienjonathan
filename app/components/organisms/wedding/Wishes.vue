<template lang="pug">
.wishes
  .heading__wrapper
    .heading {{ 'WISHES' }}
</template>
<script lang="ts" setup></script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Wishes',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.heading {
  &__wrapper {
    margin-bottom: 60px;
  }
}
</style>
