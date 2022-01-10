<template lang="pug">
OMediaBuilder.media-new(
  v-if="media"
  :media="media"
  :media-uid="mediaUid"
  :action-type="'edit'"
)
</template>
<script lang="ts" setup>
import OMediaBuilder from '~/components/organisms/admin/blog/media/OMediaBuilder.vue'
import type { Media } from '~/types/model/blog/media'

const media = ref<Media>()
const mediaUid = ref()
const route = useRoute()
const { useMedias } = useFirestoreCollections()
const firestoreMedias = useMedias()
onMounted(async () => {
  if (!route.params.id) return
  if (Array.isArray(route.params.id)) return
  media.value = await firestoreMedias.loadDocument(route.params.id)
  mediaUid.value = route.params.id
})
</script>
<script lang="ts">
export default {
  name: 'MediaEditPage',
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.media-new {
  padding: 20px;
}
</style>
