<template lang="pug">
.post
  MPageLoading(:is-loading="!hasFinishedLoading")
    .post__wrapper
      template(v-if="!post")
        .no-post
          .no-post__heading
            | 404 - Are you lost?
          .no-post__back-link(@click="handleClose")
            | back to top page
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
import MPageLoading from '~/components/molecules/MPageLoading.vue'

// Page Logic

const route = useRoute()

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
  const currentPost = post.value
  if (!currentPost) return langList
  return langList.filter(lang => {
    const hasNoTitle = !currentPost.title[lang]
    const hasNoDescription = !currentPost.description[lang]
    const hasNoContent = !content[lang]
    return hasNoTitle || hasNoDescription || hasNoContent
  })
})
const initializePost = async () => {
  const slug = (route.params.slug as string).toLowerCase()
  postsFirestore.queryBuilder.eq('slug', slug)
  const response = await postsFirestore.loadDocumentByQuery()
  if (response) {
    post.value = response.data
    for (const lang of langList) {
      const currentLangContent = response.data.contentURL[lang]
      content[lang] = currentLangContent ? await (await fetch(currentLangContent)).text() : ''
    }
  }
  hasFinishedLoading.value = true
}

onMounted(() => {
  initializePost()
})

const handleClose = () => {
  navigateTo('/blogs')
}

// Meta

const metaTitle = computed(() => {
  const content = post.value ? getContent(post.value.title, currentLang.value) : undefined
  return `darienjonathan.com${content ? ` | ${content}` : ''}`
})

const meta = computed(() => {
  const metaArr: Record<string, string>[] = []
  const description = post.value ? getContent(post.value.description, currentLang.value) : undefined
  if (description) {
    metaArr.push(
      ...['description', 'og:description', 'twitter:description'].map(name => ({
        name,
        content: description,
      }))
    )
  }
  metaArr.push(
    ...['og:title', 'twitter:title'].map(name => ({
      name,
      content: metaTitle.value,
    }))
  )
  return metaArr
})

useHead({
  title: metaTitle.value,
  meta: meta.value,
})
</script>
<script lang="ts">
definePageMeta({
  layout: 'default',
})

export default {
  name: 'BlogPage',
  components: { MPageLoading },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.no-post {
  padding: 20px;
  &__heading {
    @include font-family('roboto-slab');
    @include font($size: $font-xxhuge);
    margin-bottom: 8px;
  }
  &__back-link {
    @include font($color: $navy-blue-light);
    cursor: pointer;
    transition: 0.5s color;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
}

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
    @include pc {
      max-width: 1000px;
      margin: 0 auto;
    }
  }

  &__title {
    @include font-family('roboto-slab');
    @include font($size: $font-xxhuge);
    font-weight: bold;
    margin: 40px 0;
  }
}
</style>
