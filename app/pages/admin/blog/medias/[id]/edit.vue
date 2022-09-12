<template lang="pug">
OMediaBuilder.media-edit(
  :media-uid="mediaUid"
  :action-type="'edit'"
)
</template>
<script lang="ts" setup>
import OMediaBuilder from '~/components/organisms/admin/blog/media/OMediaBuilder.vue'

const mediaUid = ref()
const route = useRoute()
mediaUid.value = route.params.id
</script>
<script lang="ts">
export default {
  name: 'MediaEditPage',
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.media-edit {
  padding: 20px;
}
</style>
