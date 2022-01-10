<template lang="pug">
.m-header
  .items
    nuxt-link.item(to="/admin/blog/posts") posts
    nuxt-link.item(to="/admin/blog/medias") medias
  .signout.material-icons-outlined(@click="signOut") logout
</template>
<script lang="ts" setup>
const { signOut } = useAuth()
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

.signout {
  cursor: pointer;
}
</style>
