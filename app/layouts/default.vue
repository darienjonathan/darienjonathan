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
.wrapper {
  overflow-x: hidden;
}
</style>
