<template lang="pug">
.base
  slot
</template>

<script lang="ts" setup>
useViewportUnitSizes(true)

if (process.env.NODE_ENV === 'development') {
  useEmulator()
}
</script>
