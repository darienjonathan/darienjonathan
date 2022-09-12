<template lang="pug">
.base
  slot
</template>

<script lang="ts" setup>
useViewportUnitSizes()

if (process.env.NODE_ENV === 'development') {
  useEmulator()
}
</script>
