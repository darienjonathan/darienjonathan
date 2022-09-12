<template lang="pug">
.blogs
  MTopKV
  .content
    MLangSwitcher.lang-switcher(@langChange="handleLangChange")
  .post__wrapper
    .post__item(v-for="[, post] in posts")
      .post__properties
        .post__heading
          .post__title {{ getContent(post.title, currentLang) }}
          .post__created-at {{ formatWithDay(new Date(post.createdAt), currentLang) }}
        .post__content
          .post__description {{ getContent(post.description, currentLang) }}
          .post__read-more(@click="handleReadMore(post.slug)") {{ readMore[currentLang] }}
</template>
<script lang="ts" setup>
import type { Unsubscribe } from '@firebase/firestore'
import MTopKV from '~/components/molecules/MTopKV.vue'
import type { LangEnumType } from '~/types/lang'
import MLangSwitcher from '~/components/molecules/blog/post/MLangSwitcher.vue'
import type { Post } from '~/types/model/blog/post'
import { formatWithDay } from '~/utils/date'
import { getContent } from '~/utils/blog/getContent'
import { readMore } from '~/utils/translations/blog'

const currentLang = ref<LangEnumType>()
const handleLangChange = (lang: LangEnumType) => {
  currentLang.value = lang
}

const { usePosts } = useFirestoreCollections()
const postsFirestore = usePosts()
const posts = ref(new Map<string, Post>())

const unsubscribePosts = ref<Unsubscribe>()
onMounted(() => {
  unsubscribePosts.value = postsFirestore.subscribeCollection(response => {
    posts.value = response
  })
})
onUnmounted(() => {
  unsubscribePosts.value()
})

const route = useRoute()
const router = useRouter()
const handleReadMore = (slug: string) => {
  // eslint-disable-next-line no-console
  router.push(`${route.path}/${slug}`.replace(/\/+/g, '/'))
}
</script>
<script lang="ts">
export default {
  name: 'BlogsIndexPage',
  layout: 'default',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';
.content {
  padding: 20px;
}

.lang-switcher {
  width: fit-content;
  margin-left: auto;
  margin-bottom: 20px;
}

.post {
  $item-padding: 20px;
  &__wrapper {
    display: grid;
    gap: 16px;
    @include pc {
      grid-template-columns: repeat(3, 1fr);
      max-width: 1200px;
      padding: 0 40px 40px;
    }
    @include sp {
      grid-template-columns: 100%;
      padding: 0 20px 20px;
    }
  }

  &__item {
    border: 2px solid white;
  }

  &__heading,
  &__content {
    padding: $item-padding;
  }

  &__heading {
    border-bottom: 2px solid white;
  }

  &__title {
    @include font($size: $font-lg);
    margin-bottom: 4px;
  }

  &__created-at {
    @include font($size: $font-xs);
    text-align: right;
  }

  &__descripton {
    @include font($size: $font-sm);
    margin-bottom: 4px;
  }

  &__read-more {
    @include font($size: $font-xs);
    text-align: right;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
