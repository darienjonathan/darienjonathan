<template lang="pug">
OPostBuilder.new
</template>
<script lang="ts" setup>
import OPostBuilder from '~/components/organisms/admin/blog/post/OPostBuilder.vue'

defineOptions({
  name: 'AdminBlogPostsNewPage',
})

definePageMeta({
  layout: 'blog-admin',
})
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.new {
  padding: 20px;
}
</style>
