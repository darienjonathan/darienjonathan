<template lang="pug">
.blogs
  MTopKV.top-kv
  .content
    Transition(
      name="fade"
      mode="out-in"
    )
      template(v-if="!isFirstFetchDone")
        ALoading.loading
      template(v-else)
        .posts
          template(v-if="posts.size === 0")
            .no-posts This space seems to be still vacant... Mind giving me some inspiration to write?
          template(v-else)
            .post__wrapper
              .post__item(v-for="[, post] in posts")
                .post__properties
                  .post__heading
                    .post__title {{ getContent(post.title) }}
                    .post__created-at {{ formatWithDay(new Date(post.createdAt)) }}
                  .post__content
                    .post__description {{ getContent(post.description) }}
                    .post__read-more(@click="handleReadMore(post.slug)") {{ 'Read More' }}
</template>
<script lang="ts" setup>
import type { Unsubscribe } from '@firebase/firestore'
import MTopKV from '~/components/molecules/MTopKV.vue'
import type { Post } from '~/types/model/blog/post'
import { formatWithDay } from '~/utils/date'
import { getContent } from '~/utils/blog/getContent'
import ALoading from '~/components/atoms/ALoading.vue'

const { usePosts } = useFirestoreCollections()
const postsFirestore = usePosts()
const posts = ref(new Map<string, Post>())

const unsubscribePosts = ref<Unsubscribe>()

const isFirstFetchDone = ref(false)
onMounted(() => {
  unsubscribePosts.value = postsFirestore.subscribeCollection(response => {
    if (response) posts.value = response
    isFirstFetchDone.value = true
  })
})
onUnmounted(() => {
  if (!unsubscribePosts.value) return
  unsubscribePosts.value()
})

const route = useRoute()
const handleReadMore = (slug: string) => {
  navigateTo(`${route.path}/${slug}`.replace(/\/+/g, '/'))
}
</script>
<script lang="ts">
export default {
  name: 'BlogsIndexPage',
  components: { MTopKV, ALoading },
  layout: 'default',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.blogs {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-kv {
  flex: none;
}

.content {
  flex: 1;
  position: relative;
}

.loading {
  @include absolute-center;
}

.posts {
  @include pc {
    padding: 40px;
  }
  @include sp {
    padding: 40px 20px;
  }
}

.no-posts {
  @include font($size: $font-lg);
}

.post {
  $item-padding: 16px;
  &__wrapper {
    display: grid;
    gap: 32px;
    @include pc {
      grid-template-columns: repeat(3, 1fr);
      max-width: 1200px;
    }
    @include sp {
      grid-template-columns: 100%;
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
    margin-bottom: 8px;
  }

  &__created-at {
    @include font($size: $font-xs);
    text-align: right;
  }

  &__description {
    @include font($size: $font-sm, $line-height: 1.5);
    margin-bottom: 8px;
  }

  &__read-more {
    @include font($size: $font-xs);
    text-align: right;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
