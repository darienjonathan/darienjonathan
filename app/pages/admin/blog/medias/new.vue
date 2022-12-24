<template lang="pug">
OMediaBuilder.media-new
</template>
<script lang="ts" setup>
import OMediaBuilder from '~/components/organisms/admin/blog/media/OMediaBuilder.vue'
</script>
<script lang="ts">
definePageMeta({
  layout: 'blog-admin',
})

export default {
  name: 'AdminBlogMediasNewPage',
  components: { OMediaBuilder },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.media-new {
  padding: 20px;
}
</style>
