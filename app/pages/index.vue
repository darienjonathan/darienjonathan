<template lang="pug">
.index
  .content
    .heading
      .heading__main darienjonathan.com
      .heading__sub is under construction
        img.heading__icon(src="@/assets/images/under-construction/dogebread.png")
    .vertical-line
    .sns
      a.sns__item(
        href="https://github.com/darienjonathan/darienjonathan"
        target="_blank"
      )
        img.sns__icon(src="@/assets/images/sns/icon-github.png")
        | github
      a.sns__item(
        href="https://instagram.com/darienjonathan"
        target="_blank"
      )
        img.sns__icon(src="@/assets/images/sns/icon-ig.png")
        | instagram
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
})
</script>

<script lang="ts" setup></script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.index {
  width: 100vw;
  height: 100vh;
  background: $navy-dark;
}

.content {
  @include absolute-center;
  @include flex;
}

.heading {
  @include font-family('roboto-slab');
  margin-right: 24px;

  &__main {
    @include font($size: 2rem) {
      text-decoration: underline;
    }
    margin-bottom: 8px;
  }
  &__sub {
    @include flex($justify: flex-start);
    @include font($size: 1.2rem);
  }
  &__icon {
    @include size(32px);
    margin-left: 8px;
  }
}

.vertical-line {
  @include size(1px, 100px);
  background-color: $white;
}

.sns {
  @include font-family('cabin');
  margin-left: 24px;

  &__item {
    @include flex($justify: flex-start);
    @include font($line-height: 2.25);
    color: white;
  }
  &__icon {
    @include size(20px, 20px);
    margin-right: 8px;
  }
}
</style>
