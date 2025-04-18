<template lang="pug">
.posts
  .post__wrapper
    MPostListItem(
      :post="post"
      v-for="[uid, post] in posts"
      @edit="handleEdit(uid)"
      @delete="handleDelete(uid)"
    )

  AModal(:is-open="isDeleteModalOpen")
    div Are you sure you want to delete this post?
      .modal__buttons
        button.modal__button(@click="handleConfirmDelete") Yes
        button.modal__button Cancel
</template>
<script lang="ts" setup>
import type { Unsubscribe } from '@firebase/firestore'
import type { Post } from '~/types/model/blog/post'
import AModal from '~/components/atoms/AModal.vue'
import MPostListItem from '~/components/molecules/admin/blog/post/MPostListItem.vue'

defineOptions({
  name: 'AdminBlogPostsIndexPage',
})

const { usePosts } = useFirestoreCollections()
const postsFirestore = usePosts()
const posts = ref(new Map<string, Post>())

const unsubscribePosts = ref<Unsubscribe>()
onMounted(() => {
  postsFirestore.queryBuilder.orderBy('createdAt', 'desc')
  unsubscribePosts.value = postsFirestore.subscribeCollection(response => {
    if (response) posts.value = response
  })
})
onUnmounted(() => {
  if (!unsubscribePosts.value) return
  unsubscribePosts.value()
})

const route = useRoute()
const handleEdit = (uid: string) => {
  navigateTo(`${route.path}/${uid}/edit`.replace(/\/+/g, '/'))
}

const isDeleteModalOpen = ref<boolean>(false)
const uidToBeDeleted = ref<string>()
const handleDelete = (uid: string) => {
  isDeleteModalOpen.value = true
  uidToBeDeleted.value = uid
}
const handleConfirmDelete = async () => {
  if (!uidToBeDeleted.value) return
  await postsFirestore.deleteRecord(uidToBeDeleted.value)
  isDeleteModalOpen.value = false
}

definePageMeta({
  layout: 'blog-admin',
})
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.posts {
  padding: 20px;
}

.lang-switcher {
  margin-bottom: 24px;
}

.post {
  &__wrapper {
    display: grid;
    gap: 20px;
    @include pc() {
      grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    }
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
