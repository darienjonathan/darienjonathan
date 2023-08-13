<template lang="pug">
OPostBuilder.new
</template>
<script lang="ts" setup>
import OPostBuilder from '~/components/organisms/admin/blog/post/OPostBuilder.vue'

definePageMeta({
  layout: 'blog-admin',
})
</script>
<script lang="ts">
export default {
  name: 'AdminBlogPostsNewPage',
  components: { OPostBuilder },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.new {
  padding: 20px;
}
</style>
