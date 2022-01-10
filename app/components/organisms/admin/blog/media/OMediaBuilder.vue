<template lang="pug">
.o-new-or-edit-media
  h3.title {{  actionType === "edit" ? 'Edit Media' : 'New Media'  }}
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
import type { Media, MediaType } from '~/types/model/blog/media'
import AModal from '~/components/atoms/AModal.vue'

const props = defineProps({
  media: {
    type: Object as () => Media,
    default: () => undefined,
  },
  mediaUid: {
    type: String,
    default: undefined,
  },
  actionType: {
    type: String as () => 'edit' | 'new',
    default: 'new',
  },
})

const caption = ref<string>('')
const handleCaptionInput = (e: Event) => {
  caption.value = (e.target as HTMLTextAreaElement).value
}

const storage = useNuxtApp().$firebase.storage
const file = ref<File>()
const fileInputRef = ref<HTMLInputElement>()
const fileName = ref<string>('')
const fileType = ref<MediaType>()
const filePreview = computed(() => file.value && URL.createObjectURL(file.value))

onMounted(async () => {
  if (props.actionType === 'new') return
  if (!props.media) return
  caption.value = props.media.caption
  fileName.value = props.media.fileName
  fileType.value = props.media.type
  const url = await storage.getDownloadURL(props.media.fileLocation)
  const response = await fetch(url)
  const blob = await response.blob()
  file.value = new File([blob], props.media.fileName, {
    type: blob.type,
  })
})

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
  const media = {
    fileLocation: upload.ref.fullPath,
    type: fileType.value,
    caption: caption.value,
    fileName: fileName.value,
  }
  if (props.actionType === 'new') {
    mediasFirestore.push(media)
  } else if (props.actionType === 'edit') {
    if (!props.mediaUid) return
    mediasFirestore.update(props.mediaUid, media)
  }
  handleUploadSuccess()
}

const handleUploadSuccess = () => {
  isUploadSuccessModalOpen.value = true
  if (props.actionType === 'edit') return
  file.value = undefined
  caption.value = undefined
  fileInputRef.value.value = ''
}

const isUploadSuccessModalOpen = ref(false)
</script>
<script lang="ts">
export default {
  name: 'OMediaBuilder',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

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
