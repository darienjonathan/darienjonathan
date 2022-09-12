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
<style lang="scss" scoped>
@import '~/assets/css/main';

:deep(h1),
:deep(h2),
:deep(h3),
:deep(p) {
  margin: 4px 0;
}

:deep(img) {
  max-width: 100%;
  margin: 12px 0;
}
:deep(blockquote) {
  margin: 12px 0;
  padding: 4px 0 4px 8px;
  border-left: 4px solid $gray;
}
</style>
