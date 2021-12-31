<template lang="pug">
.wrapper
  slot
</template>

<script lang="ts" setup>
useViewportUnitSizes()

if (process.env.NODE_ENV === 'development') {
  useEmulator()
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';
.wrapper {
  overflow-x: hidden;
  background: $navy-dark;
  min-width: vw(100);
  min-height: vh(100);
}
</style>
