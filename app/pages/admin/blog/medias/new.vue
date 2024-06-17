<template lang="pug">
OMediaBuilder.media-new
</template>
<script lang="ts" setup>
import OMediaBuilder from '~/components/organisms/admin/blog/media/OMediaBuilder.vue'

defineOptions({
  name: 'AdminBlogMediasNewPage',
})

definePageMeta({
  layout: 'blog-admin',
})
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.media-new {
  padding: 20px;
}
</style>
