<template lang="pug">
OPostBuilder.new
</template>
<script lang="ts" setup>
import OPostBuilder from '~/components/organisms/admin/blog/post/OPostBuilder.vue'
</script>
<script lang="ts">
export default {
  name: 'PostsNewPage',
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.new {
  padding: 20px;
}
</style>
