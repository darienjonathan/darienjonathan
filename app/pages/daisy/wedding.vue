<template lang="pug">
.wedding
  Transition(
    name="fade"
    mode="out-in"
  )
    template(v-if="!isLoadingDone")
      ALoading.loading
    template(v-else)
      .wrapper
        Hero.hero(:is-reception="isReception")
        .content
</template>
<script lang="ts" setup>
import ALoading from '~/components/atoms/ALoading.vue'
import Hero from '~/components/molecules/wedding/Hero.vue'

const isReception = ref(true)

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
.wedding {
  overflow-x: hidden;
  min-width: 100vw;
  min-height: 100vh;

  .loading {
    @include absolute-center;
  }
  .hero {
    background: $navy-dark;
    @include size(100vw, 100vh);
  }

  .content {
    height: 200vh;
  }
}
</style>
