<template lang="pug">
.medias
  .section
    h2.section__title IMAGES
    .media__list(v-if="images.length")
      MMediaListItem.media__item(
        v-for="image in images"
        v-bind="image"
      )
    div(v-else) There are no images
  hr.line
  .section
    h2.section__title VIDEOS
    .media__list(v-if="videos.length")
      MMediaListItem.media__item(
        v-for="video in videos"
        v-bind="video"
      )
    div(v-else) There are no videos
</template>
<script lang="ts" setup>
import MMediaListItem from '~/components/molecules/admin/blog/media/MMediaListItem.vue'
const { useMedias } = useFirestoreCollections()
const firestoreMedias = useMedias()
const images = ref<InstanceType<typeof MMediaListItem>['$props'][]>([])
const videos = ref<InstanceType<typeof MMediaListItem>['$props'][]>([])
onMounted(async () => {
  const mediaCollection = await firestoreMedias.loadCollection()
  if (!mediaCollection) return
  Array.from(mediaCollection).forEach(([uid, media]) => {
    ;(media.type === 'image' ? images.value : videos.value).push({
      ...media,
      uid,
    })
  })
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
}
</style>
