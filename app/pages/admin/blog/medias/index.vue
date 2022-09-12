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
  AModal(:is-open="isDeleteModalOpen")
    div Are you sure you want to delete this media?
      .modal__buttons
        button.modal__button(@click="handleConfirmDelete") Yes
        button.modal__button Cancel
</template>
<script lang="ts" setup>
import type { Unsubscribe } from 'firebase/firestore'
import MMediaListItem from '~/components/molecules/admin/blog/media/MMediaListItem.vue'
import type { Media } from '~/types/model/blog/media'
import AModal from '~/components/atoms/AModal.vue'

const { useMedias } = useFirestoreCollections()
const mediasFirestore = useMedias()
const images = ref<Map<string, Media>>(new Map())
const videos = ref<Map<string, Media>>(new Map())
const unsubscribeMedia = ref<Unsubscribe>()
onMounted(() => {
  unsubscribeMedia.value = mediasFirestore.subscribeCollection(mediaMap => {
    const currentImages = new Map<string, Media>()
    const currentVideos = new Map<string, Media>()
    Array.from(mediaMap || []).forEach(([uid, media]) => {
      ;(media.type === 'image' ? currentImages : currentVideos).set(uid, media)
    })
    images.value = currentImages
    videos.value = currentVideos
  })
})

onUnmounted(() => {
  unsubscribeMedia.value()
})

const route = useRoute()
const router = useRouter()
const handleEdit = (uid: string) => {
  router.push(`${route.path}/${uid}/edit`.replace(/\/+/g, '/'))
}

const isDeleteModalOpen = ref<boolean>(false)
const uidToBeDeleted = ref<string>()
const handleDelete = (uid: string) => {
  isDeleteModalOpen.value = true
  uidToBeDeleted.value = uid
}
const handleConfirmDelete = async () => {
  if (!uidToBeDeleted.value) return
  await mediasFirestore.deleteRecord(uidToBeDeleted.value)
  isDeleteModalOpen.value = false
}
</script>
<script lang="ts">
export default {
  name: 'MediasIndexPage',
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
    @include pc {
      grid-template-columns: repeat(auto-fill, 300px);
    }
    @include sp {
      grid-template-columns: repeat(auto-fill, 175px);
    }
  }
  &__item {
    margin: 8px;
  }
}

.modal {
  &__buttons {
    @include flex;
    padding-top: 20px;
  }
  &__button {
    @include button($bg-color: rgba($navy-blue-light, 0.5));
    width: 150px;
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}
</style>
