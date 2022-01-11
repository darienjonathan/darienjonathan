<template lang="pug">
.medias
  .section
    h2.section__title IMAGES
    .media__list(v-if="images.size")
      MMediaListItem.media__item(
        v-for="[uid, image] in images"
        :media="image"
        @edit="handleEdit(uid)"
        @delete="handleDelete(uid)"
      )
    div(v-else) There are no images
  hr.line
  .section
    h2.section__title VIDEOS
    .media__list(v-if="videos.size")
      MMediaListItem.media__item(
        v-for="[uid, video] in videos"
        :media="video"
        @edit="handleEdit(uid)"
        @delete="handleDelete(uid)"
      )
    div(v-else) There are no videos
</template>
<script lang="ts" setup>
import MMediaListItem from '~/components/molecules/admin/blog/media/MMediaListItem.vue'
import type { Media } from '~/types/model/blog/media'

const { useMedias } = useFirestoreCollections()
const firestoreMedias = useMedias()
const images = ref<Map<string, Media>>(new Map())
const videos = ref<Map<string, Media>>(new Map())
onMounted(async () => {
  const mediaCollection = await firestoreMedias.loadCollection()
  if (!mediaCollection) return
  Array.from(mediaCollection).forEach(([uid, media]) => {
    ;(media.type === 'image' ? images.value : videos.value).set(uid, media)
  })
})

const route = useRoute()
const router = useRouter()
const handleEdit = (uid: string) => {
  router.push(`${route.path}/${uid}/edit`.replace(/\/+/g, '/'))
}

const handleDelete = (uid: string) => {
  console.log('try delete')
}
</script>
<script lang="ts">
export default {
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.medias {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
  &__title {
    margin-bottom: 12px;
  }
}

.line {
  margin: 24px 0;
}

.media {
  &__list {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto;
  }
  &__item {
    margin: 8px;
  }
}
</style>
