<template lang="pug">
.m-header
  .items
    nuxt-link.item(to="/admin/blog/posts") posts
    nuxt-link.item(to="/admin/blog/medias") medias
  .icons
    .icon.material-icons-outlined(@click="goToNewPage") add_circle_outline
    .icon.material-icons-outlined(@click="signOut") logout
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
const route = useRoute()
const router = useRouter()

const entity = computed(() => {
  const regex = /admin\/blog\/(\w+)(\/.*)?/
  const match = route.path.match(regex)
  if (!match) return
  return match[1]
})

const goToNewPage = () => {
  if (!entity.value) return
  router.push(`/admin/blog/${entity.value}/new`)
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/main';

.m-header {
  @include size(vw(100), 56px);
  @include flex($justify: space-between);
  background: rgba($black, 0.5);
  padding: 20px;
}

.items {
  @include flex($justify: flex-start);
  padding-right: 20px;
}

.item {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child) {
    margin-right: 20px;
  }
}

.icon {
  &s {
    @include flex($justify: flex-start);
  }

  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
