<template lang="pug">
Transition(
  name="fade"
  mode="out-in"
  @enter="defineViewportVariables"
)
  template(v-if="isLoading")
    .loading__wrapper
      ALoading.loading__ui
  template(v-else)
    slot
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
</script>
<script lang="ts">
export default {
  name: 'MPageLoading',
  components: { ALoading },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.loading {
  &__wrapper {
    width: 100vw;
    height: 100vh;
  }
  &__ui {
    @include absolute-center;
  }
}
</style>
