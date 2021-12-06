<template lang="pug">
.wrapper
  slot
</template>

<script lang="ts" setup>
useViewportUnitSizes()
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-x: hidden;
}
</style>
