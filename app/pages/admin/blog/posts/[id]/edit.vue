<template lang="pug">
OPostBuilder.edit(
  :post-uid="postUid"
  :action-type="'edit'"
)
</template>
<script lang="ts" setup>
import OPostBuilder from '~/components/organisms/admin/blog/post/OPostBuilder.vue'

const postUid = ref()
const route = useRoute()
postUid.value = route.params.id

definePageMeta({
  layout: 'blog-admin',
})
</script>
<script lang="ts">
export default {
  name: 'AdminBlogPostsEditPage',
  components: { OPostBuilder },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.edit {
  padding: 20px;
}
</style>
