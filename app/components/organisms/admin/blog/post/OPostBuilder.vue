<template lang="pug">
.o-post-builder
  h3.title {{  actionType === "edit" ? 'Edit Media' : 'New Media'  }}
  .form
    .form__item
      .form__label Slug
      input.form__input(
        @input="handleSlugInput"
        :value="slug"
      )
  hr.line
  MLangSwitcher.lang-switcher(@langChange="handleLangChange")
  .form
    .form__item
      .form__label Title
      input.form__input(
        @input="handleTitleInput"
        :value="currentTitle"
      )
    .form__item
      .form__label Description
      textarea.form__input(
        @input="handleDescriptionInput"
        :value="currentDescription"
      )
    .form-md__item
      .form-md__heading
        .form-md__label Content
        .form-md__preview(
          @click="isPreviewOpen = true"
          :data-disabled="!currentContent?.length"
        ) Preview
      textarea.form-md__input(
        @input="handleContentInput"
        :value="currentContent"
        rows="20"
      )
    button.form__submit-btn(@click="handleSubmit") Submit
  AModal(
    :is-open="isPreviewOpen"
    @close="isPreviewOpen = false"
  )
    h4.preview__title Preview
    AMarkdown.preview__html(:content="currentContent")

  AModal(
    :is-open="isUploadSuccessModalOpen"
    @close="handleCloseUploadSuccessModal"
  ) Upload Successful!
</template>
<script lang="ts" setup>
import { LangEnum, langList } from '~/types/lang'
import type { Lang, LangEnumType } from '~/types/lang'
import AModal from '~/components/atoms/AModal.vue'
import AMarkdown from '~/components/atoms/AMarkdown.vue'
import MLangSwitcher from '~/components/molecules/blog/post/MLangSwitcher.vue'
import { asyncReplace } from '~/utils/string'
import type { Post } from '~/types/model/blog/post'

const props = defineProps({
  postUid: {
    type: String,
    default: undefined,
  },
  actionType: {
    type: String as () => 'edit' | 'new',
    default: 'new',
  },
})

const router = useRouter()
const { useMedias, usePosts: usePostsFirestore } = useFirestoreCollections()
const { useImages, useVideos, usePosts: usePostsStorage } = useStorageItems()
const mediasFirestore = useMedias()
const imagesStorage = useImages()
const videosStorage = useVideos()
const postsFirestore = usePostsFirestore()
const postsStorage = usePostsStorage()

// 作成時間

const createdAt = ref<number>()

// スラグ

const slug = ref<string>('')
const handleSlugInput = (e: Event) => {
  slug.value = (e.target as HTMLInputElement).value
}

// 言語切り替え

const currentLang = ref<LangEnumType>()
const handleLangChange = (lang: LangEnumType) => {
  currentLang.value = lang
}

// タイトル

const title = reactive<Lang<string>>({
  [LangEnum.en]: '',
  [LangEnum.id]: '',
  [LangEnum.ja]: '',
})
const currentTitle = computed(() => title[currentLang.value])

const handleTitleInput = (e: Event) => {
  title[currentLang.value] = (e.target as HTMLInputElement).value
}

// デスクリプション

const description = reactive<Lang<string>>({
  [LangEnum.en]: '',
  [LangEnum.id]: '',
  [LangEnum.ja]: '',
})
const currentDescription = computed(() => description[currentLang.value])

const handleDescriptionInput = (e: Event) => {
  description[currentLang.value] = (e.target as HTMLTextAreaElement).value
}

// コンテンツ

const content = reactive<Lang<string>>({
  [LangEnum.en]: '',
  [LangEnum.id]: '',
  [LangEnum.ja]: '',
})
const currentContent = computed(() => content[currentLang.value])

// メディア情報取得

const convertUidToMedia = (text: string) => {
  const regex = /!\[\]\(([\w|\d]*)\)/g
  const replacementFn = async (id: string) => {
    const media = await mediasFirestore.loadDocument(id)
    if (!media) return id
    const url =
      media.type === 'image'
        ? await imagesStorage.getDownloadURL(media.fileName)
        : media.type === 'video'
        ? await videosStorage.getDownloadURL(media.fileName)
        : ''
    return `![](${url})`
  }
  return asyncReplace(text, regex, replacementFn)
}

const handleContentInput = async (e: Event) => {
  content[currentLang.value] = await convertUidToMedia((e.target as HTMLInputElement).value)
}

// 投稿する

const { userUid } = useAuth()
const thisPostUid = ref<string>(props.postUid)

const handleSaveFile = async (): Promise<Lang> => {
  const items: Lang = {
    [LangEnum.en]: '',
    [LangEnum.id]: '',
    [LangEnum.ja]: '',
  }

  for (const lang of langList) {
    const fileName = thisPostUid.value + '_' + lang + '.md'
    await postsStorage.putString({
      file: content[lang],
      fileName,
      customMetadata: postsStorage.authorUidMetadata(userUid.value),
    })
    items[lang] = await postsStorage.getDownloadURL(fileName)
  }
  return items
}

const isUploadSuccessModalOpen = ref(false)

const handleSubmit = async () => {
  if (props.actionType === 'new') {
    thisPostUid.value = postsFirestore.getNewId()
  }
  const storageItems = await handleSaveFile()
  const post: Post = {
    authorUid: userUid.value,
    slug: slug.value,
    title,
    description,
    createdAt: createdAt.value || Date.now(),
    updatedAt: Date.now(),
    // TODO: タグ機能実装
    tagUids: [],
    contentURL: storageItems,
  }
  if (props.actionType === 'new') {
    const response = await postsFirestore.push(post)
    thisPostUid.value = response.id
  } else if (props.actionType === 'edit') {
    if (!props.postUid) return
    await postsFirestore.update(props.postUid, post)
  }
  isUploadSuccessModalOpen.value = true
}

const handleCloseUploadSuccessModal = () => {
  isUploadSuccessModalOpen.value = false
  if (props.actionType !== 'new') return
  setTimeout(() => {
    router.push(`/admin/blog/posts/${thisPostUid.value}/edit`)
  }, 500)
}

const isPreviewOpen = ref(false)

// 初期化

const initializePost = async () => {
  const post = await postsFirestore.loadDocument(props.postUid)
  createdAt.value = post.createdAt
  slug.value = post.slug
  for (const lang of langList) {
    title[lang] = post.title[lang]
    description[lang] = post.description[lang]
    const contentResponse = await fetch(post.contentURL[lang])
    content[lang] = await contentResponse.text()
  }
}

onMounted(() => {
  if (props.actionType === 'new') return
  initializePost()
})
</script>
<script lang="ts">
export default {
  name: 'OPostBuilder',
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

  &__input {
    width: 200px;
  }

  &__submit-btn {
    margin-top: 8px;
    @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  }
}

.form-md {
  &__item {
    margin-bottom: 16px;
  }

  &__heading {
    @include flex($justify: flex-start);
    margin-bottom: 8px;
  }

  &__label {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid $white;
  }

  &__preview {
    cursor: pointer;
    text-decoration: underline;
    @include font($color: $navy-blue-light);
    &[data-disabled='true'] {
      cursor: auto;
      pointer-events: none;
      @include font($color: $gray);
    }
  }

  &__input {
    width: 75%;
    @include sp {
      width: 100%;
    }
  }
}

.line {
  margin: 24px 0;
}

.lang-switcher {
  margin-bottom: 24px;
}

.preview {
  &__title {
    @include font($size: $font-huge, $color: inherit);
    margin-bottom: 24px;
  }
}
</style>