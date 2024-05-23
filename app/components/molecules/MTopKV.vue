<template lang="pug">
.m-top-kv
  .heading
    .heading__top darienjonathan's
    .heading__main #thelazyblog:
    .heading__sub A public space for personal views of mine
  .line
  .sns
    a.sns__item(
      href="https://github.com/darienjonathan/darienjonathan"
      target="_blank"
    )
      img.sns__icon(src="@/assets/images/sns/icon-github-white.png")
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
  name: 'MTopKV',
  layout: 'default',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';
.m-top-kv {
  @include pc {
    @include flex;
    height: 300px;
  }
  @include sp {
    @include flex($direction: column, $align-items: flex-start);
    padding: 40px;
  }
  border-bottom: 1px solid white;
}

.heading {
  @include font-family('roboto-slab');
  text-align: right;
  @include pc {
    margin-right: 24px;
    max-width: 600px;
  }
  @include sp {
    margin-bottom: 16px;
    width: 100%;
  }

  &__main {
    @include font($size: 5rem) {
      text-decoration: underline;
    }
    margin-bottom: 16px;
  }
  &__top {
    @include font($size: $font-xs);
    margin-bottom: -6px;
  }
  &__sub {
    @include font($size: $font-xs);
  }
}

.line {
  background-color: $white;
  @include pc {
    @include size(1px, 120px);
  }
  @include sp {
    display: none;
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
