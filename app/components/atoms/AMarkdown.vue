<template lang="pug">
.a-markdown(v-html="markdownHTML")
</template>
<script lang="ts" setup>
const { $md } = useNuxtApp()
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})
const markdownHTML = computed(() => {
  return $md.render(props.content)
})
</script>
<style lang="scss" scoped></style>
