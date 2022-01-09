<template lang="pug">
.medias
  .section
    h2.section__title IMAGES
    .media__list(v-if="images.length")
      .media__item(v-for="image in images")
        img.media__src(:src="image.url")
    div(v-else) There are no images
  hr.line
  .section
    h2.section__title VIDEOS
    .media__list(v-if="videos.length")
      .media__item(v-for="video in videos")
        video.media__src(:src="video.url")
    div(v-else) There are no videos
</template>
<script lang="ts" setup>
import type { Media } from '~/types/model/blog/media'
type MediaWithURL = Media & {
  url: string
}
const { useMedias } = useFirestoreCollections()
const storage = useNuxtApp().$firebase.storage
const firestoreMedias = useMedias()
const images = ref<MediaWithURL[]>([])
const videos = ref<MediaWithURL[]>([])
onMounted(async () => {
  const mediaCollection = await firestoreMedias.loadCollection()
  if (!mediaCollection) return
  for (const media of mediaCollection.values()) {
    const url = await storage.getDownloadURL(media.fileLocation)
    const mediaArr = media.type === 'image' ? images.value : videos.value
    mediaArr.push({
      ...media,
      url,
    })
  }
})
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
  &__src {
    object-fit: contain;
    @include pc {
      max-width: 300px;
      max-height: 300px;
    }
    @include sp {
      max-width: 150px;
      max-height: 150px;
    }
  }
}
</style>
