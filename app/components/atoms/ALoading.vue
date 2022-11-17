<template lang="pug">
.loading(:style="{ width, height }")
</template>
<script lang="ts" setup>
interface Props {
  size: 'default' | 'full-size' | 'auto'
  width: string
  height: string
  isOpen: boolean
}
defineProps({
  width: {
    type: String as () => Props['width'],
    default: '',
  },
  height: {
    type: String as () => Props['height'],
    default: '',
  },
})
</script>
<script lang="ts">
export default {
  name: 'ALoading',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.loading {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;

  &::after,
  &::before {
    content: '';
    @include size(100%, 100%);
    box-sizing: border-box;
    border: 2px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
    animation: rotation 5s ease-in-out infinite alternate;
  }

  &::after {
    border-color: $navy-blue-light;
    animation-direction: alternate-reverse;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
