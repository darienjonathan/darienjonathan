<template lang="pug">
OPostBuilder.new
</template>
<script lang="ts" setup>
import OPostBuilder from '~/components/organisms/admin/blog/post/OPostBuilder.vue'
</script>
<script lang="ts">
definePageMeta({
  layout: 'blog-admin',
})

export default {
  name: 'AdminBlogPostsNewPage',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.new {
  padding: 20px;
}
</style>
