<template lang="pug">
ONewOrEditMedia.media-new
</template>
<script lang="ts" setup>
import ONewOrEditMedia from '~/components/organisms/admin/blog/media/ONewOrEditMedia.vue'
</script>
<script lang="ts">
export default {
  name: 'MediaNewPage',
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.media-new {
  padding: 20px;
}
</style>
