<template lang="pug">
.index
  .content
    .heading
      .heading__main darienjonathan.com
      .heading__sub is under construction
        img.heading__icon(src="@/assets/images/under-construction/dogebread.png")
    .line
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
export default {
  name: 'IndexPage',
}
</script>

<script lang="ts" setup></script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.index {
  @include size(vw(100), vh(100));
}

.content {
  @include absolute-center;
  @include pc {
    @include flex;
  }
  @include sp {
    @include flex($direction: column, $align-items: flex-start);
  }
}

.heading {
  @include font-family('roboto-slab');
  @include pc {
    margin-right: 24px;
  }
  @include sp {
    margin-bottom: 16px;
  }

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

.line {
  background-color: $white;
  @include pc {
    @include size(1px, 100px);
  }
  @include sp {
    @include size(100%, 1px);
  }
}

.sns {
  @include font-family('cabin');
  @include pc {
    margin-left: 24px;
  }
  @include sp {
    margin-top: 16px;
  }

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
