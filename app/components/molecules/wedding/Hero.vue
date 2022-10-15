<template lang="pug">
.hero
  .kv
    .kv__title {{ 'DAISY & DARIEN' }}
    .kv__line
    .kv__date {{ 'Saturday, 6 January 2024' }}
    .kv__rsvp-btn
      .rsvp-btn__icon.material-icons-outlined expand_more
      template(v-if="isReception")
        .rsvp-btn__text {{ 'Venue & RSVP' }}
      template(v-else)
        .rsvp-btn__text {{ 'Holy Matrimony Location' }}
</template>
<script lang="ts" setup>
defineProps({
  isReception: {
    type: Boolean,
    default: false,
  },
})

const isLoadingDone = ref(false)
onMounted(() => {
  isLoadingDone.value = true
})
</script>
<script lang="ts">
definePageMeta({
  layout: 'base',
})
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.kv {
  @mixin bounce-animation {
    @keyframes bounce {
      0% {
        transform: translateY(0px);
      }
      15% {
        transform: translateY(4px);
      }
      30% {
        transform: translateY(0);
      }
    }
    animation-name: bounce;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-delay: 1s;
  }

  & {
    @include absolute-center;
    @include flex(column);
    width: 100%;
    padding: 20px;
  }

  &__title {
    @include font-family('marcellus');
    text-align: center;
    font-size: 4rem;
  }
  &__line {
    height: 1px;
    background: $white;
    margin: 8px auto;
    @include pc {
      width: 400px;
    }
    @include sp {
      width: 100%;
    }
  }
  &__date {
    @include font-family('marcellus');
    @include font($size: $font-lg);
    line-height: 2;
    text-align: center;
    margin-bottom: 16px;
  }
  &__rsvp-btn {
    @include flex;
    @include font-family('marcellus');
    @include bounce-animation;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
    &:hover {
      border-color: $white;
    }
  }
}

.rsvp-btn {
  &__icon {
    @include font($size: $font-xxl);
    margin-right: 4px;
  }

  &__text {
    @include font($size: $font-sm);
  }
}
</style>
