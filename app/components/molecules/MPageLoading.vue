<template lang="pug">
.slot(:data-show="!isLoading")
  slot
.loading__wrapper(:data-show="isLoading")
  ALoading.loading__ui
</template>
<script lang="ts" setup>
import ALoading from '~/components/atoms/ALoading.vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const { defineViewportVariables } = useViewportUnitSizes(false)

onBeforeMount(() => {
  defineViewportVariables()
})
</script>
<script lang="ts">
export default {
  name: 'MPageLoading',
  components: { ALoading },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

$transition-time: 0.25s;

.loading__wrapper,
.slot {
  opacity: 0;
  transition: opacity $transition-time ease-in-out;
  &[data-show='true'] {
    opacity: 1;
  }
}

.slot {
  height: 0;
  &[data-show='true'] {
    height: auto;
  }
}

.loading__wrapper {
  display: none;
  transition: display 0s $transition-time;
  &[data-show='true'] {
    display: block;
  }
}

.loading {
  &__wrapper {
    @include absolute($top: 0, $left: 0);
    @include size(vw(100), vh(100));
    pointer-events: none;
  }
  &__ui {
    @include absolute-center;
  }
}
</style>
