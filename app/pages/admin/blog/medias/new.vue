<template lang="pug">
.media-new
  h3.title New Media
  .form
    .form__item
      .form__label Upload File
      input.form__input(
        ref="fileInputRef"
        type="file"
        accept="video/mp4,video/x-m4v,video/*,image/*"
        @change="handleSelectFile"
      )
    template(v-if="fileType === 'image'")
      img.form__asset-preview(
        v-if="filePreview"
        :src="filePreview"
      )
    template(v-else-if="fileType === 'video'")
      video.form__asset-preview(
        v-if="filePreview"
        :src="filePreview"
        controls
      )
    .form__item
      .form__label File name
      input.form__input(
        @input="handleFileNameInput"
        :value="fileName"
      )
    .form__item
      .form__label Caption
      textarea.form__input(
        @input="handleCaptionInput"
        :value="caption"
      )
    button.form__submit-btn(@click="handleSubmit") Submit
  AModal(
    :is-open="isUploadSuccessModalOpen"
    @close="isUploadSuccessModalOpen = false"
  ) Upload Successful!
</template>
<script lang="ts" setup>
import type { MediaType } from '~/types/model/blog/media'
import AModal from '~/components/atoms/AModal.vue'

const caption = ref<string>('')
const handleCaptionInput = (e: Event) => {
  caption.value = (e.target as HTMLTextAreaElement).value
}

const file = ref<File>()
const fileInputRef = ref<HTMLInputElement>()
const fileName = ref<string>('')
const fileType = ref<MediaType>()
const filePreview = computed(() => file.value && URL.createObjectURL(file.value))
const handleSelectFile = (e: Event) => {
  const uploadedFile = (e.target as HTMLInputElement).files[0]
  file.value = uploadedFile
  fileName.value = uploadedFile.name
  const type = uploadedFile.type.replace(/\/[^/]+$/, '')
  fileType.value = type === 'image' ? 'image' : type === 'video' ? 'video' : undefined
}

const handleFileNameInput = (e: Event) => {
  fileName.value = (e.target as HTMLInputElement).value
}

watch(file, f => {
  if (f) return
  fileName.value = ''
  fileType.value = undefined
})

const { useMedias } = useFirestoreCollections()
const { useImages, useVideos } = useStorageItems()
const mediasFirestore = useMedias()
const imagesStorage = useImages()
const videosStorage = useVideos()
const handleSubmit = async () => {
  const storage = fileType.value === 'image' ? imagesStorage : videosStorage
  const upload = await storage.put({ file: file.value, fileName: fileName.value })
  mediasFirestore.push({
    fileLocation: upload.ref.fullPath,
    type: fileType.value,
    caption: caption.value,
    fileName: fileName.value,
  })
  handleUploadSuccess()
}

const handleUploadSuccess = () => {
  file.value = undefined
  caption.value = undefined
  fileInputRef.value.value = ''
  isUploadSuccessModalOpen.value = true
}

const isUploadSuccessModalOpen = ref(false)
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

.title {
  margin-bottom: 20px;
}
.form {
  &__item {
    margin-bottom: 16px;
    @include pc {
      @include flex($justify: flex-start);
    }
  }

  &__label {
    @include pc {
      width: 100px;
    }
    @include sp {
      margin-bottom: 8px;
    }
  }

  &__asset-preview {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    object-fit: contain;
    margin-bottom: 16px;
  }

  &__input {
    width: 200px;
  }

  &__submit-btn {
    margin-top: 8px;
    @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  }
}
</style>
