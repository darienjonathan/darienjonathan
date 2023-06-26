<template lang="pug">
.m-header
  .items
    template(v-for="entity in entities")
      NuxtLink.item(
        :to="`/admin/blog/${entity}`"
        :data-active="currentEntity === entity"
      ) {{ entity }}
  .icons
    .icon.material-icons-outlined(
      v-if="!!currentEntity"
      @click="goToNewPage"
    ) add_circle_outline
    .icon.material-icons-outlined(@click="signOut") logout
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
const route = useRoute()

const entities = ['posts', 'medias']

const currentEntity = computed(() => {
  const regex = /admin\/blog\/(\w+)(\/.*)?/
  const match = route.path.match(regex)
  if (!match) return
  return match[1]
})

const goToNewPage = () => {
  if (!currentEntity.value) return
  navigateTo(`/admin/blog/${currentEntity.value}/new`)
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
  @include flex($justify: flex-start, $align-items: flex-start);
  padding-right: 20px;
}

.item {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.25s;
  &:hover {
    opacity: 0.75;
  }
  &[data-active='true'] {
    padding-bottom: 4px;
    border-bottom: 2px solid white;
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
