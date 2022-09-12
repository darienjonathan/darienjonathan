<template lang="pug">
.post 
  template(v-if="!hasFinishedLoading") loading
  template(v-else-if="!post") no content
  template(v-else)
    .post__heading
      .post__info
        MLangSwitcher.post__lang-switcher(
          @langChange="handleLangChange"
          :disabled-langs="unavailableLangList"
        )
        .post__created-at {{ formatWithDay(new Date(post.createdAt), currentLang) }}
      .post__close-btn.material-icons-outlined(@click="handleClose") close
    .post__item
      .post__title {{ getContent(post.title, currentLang) }}
      AMarkdown.storage__content(:content="getContent(content, currentLang)")
</template>
<script lang="ts" setup>
import { langList, LangEnum } from '~/types/lang'
import { formatWithDay } from '~/utils/date'
import type { Lang, LangEnumType } from '~/types/lang'
import type { Post } from '~/types/model/blog/post'
import { getContent } from '~/utils/blog/getContent'
import MLangSwitcher from '~/components/molecules/blog/post/MLangSwitcher.vue'

import AMarkdown from '~/components/atoms/AMarkdown.vue'

const route = useRoute()
const router = useRouter()

const currentLang = ref<LangEnumType>()
const handleLangChange = (lang: LangEnumType) => {
  currentLang.value = lang
}
const { usePosts } = useFirestoreCollections()
const postsFirestore = usePosts()

const hasFinishedLoading = ref(false)
const post = ref<Post>()
const content = reactive<Lang<string>>({
  [LangEnum.en]: '',
  [LangEnum.id]: '',
  [LangEnum.ja]: '',
})
const unavailableLangList = computed(() => {
  if (!post.value) return langList
  return langList.filter(lang => {
    const hasNoTitle = !post.value.title[lang]
    const hasNoDescription = !post.value.description[lang]
    const hasNoContent = !content[lang]
    return hasNoTitle && hasNoDescription && hasNoContent
  })
})
const initializePost = async () => {
  postsFirestore.queryBuilder.eq('slug', route.params.slug)
  const response = await postsFirestore.loadDocumentByQuery()
  if (response) {
    post.value = response.data
    for (const lang of langList) {
      const contentResponse = await fetch(response.data.contentURL[lang])
      content[lang] = await contentResponse.text()
    }
  }
  hasFinishedLoading.value = true
}

onMounted(() => {
  initializePost()
})

const handleClose = () => {
  router.push('/blogs')
}
</script>
<script lang="ts">
export default {
  name: 'BlogItemPage',
  layout: 'default',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.post {
  &__heading,
  &__item {
    padding: 20px;
  }

  &__heading {
    @include flex($justify: space-between);
    border-bottom: 2px solid $white;
  }

  &__close-btn {
    font-size: 40px;
    cursor: pointer;
  }

  &__lang-switcher {
    margin-bottom: 8px;
  }

  &__created-at {
    @include font($size: $font-xs);
  }

  &__item {
    word-break: break-word;
  }

  &__title {
    @include font-family('roboto-slab');
    @include font($size: $font-xxhuge);
    font-weight: bold;
    margin: 40px 0;
  }
}
</style>
