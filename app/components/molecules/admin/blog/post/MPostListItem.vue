<template lang="pug">
.m-post-list-item
  .post__properties
    .post__title {{ post.title[DEFAULT_LANG] || 'no-content' }}
    .post__description {{ post.description[DEFAULT_LANG] || 'no-content' }}
  .post__actions
    .post__action.material-icons-outlined(@click="$emit('edit')") edit
    .post__action.material-icons-outlined(@click="$emit('delete')") delete
</template>
<script lang="ts" setup>
import type { Post } from '~/types/model/blog/post'
import { DEFAULT_LANG } from '~/types/lang'

type Props = {
  post: Post
}

defineProps<Props>()
</script>
<script lang="ts">
export default {
  name: 'MMediaListItem',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

$content-padding: 12px;

.m-post-list-item {
  border: 2px solid white;
}
.post {
  &__properties,
  &__actions {
    padding: $content-padding;
  }

  &__properties {
    border-bottom: 2px solid white;
    word-break: break-word;
  }

  &__title {
    @include font($size: $font-xl);
    margin-bottom: 8px;
  }

  &__description {
    @include font($size: $font-sm);
  }

  &__actions {
    @include flex($justify: flex-end);
    grid-area: actions;
    @include pc {
      justify-self: end;
    }
  }
  &__action {
    cursor: pointer;
    @include pc {
      @include font($size: $font-xxxl);
    }
    @include sp {
      @include font($size: $font-lg);
    }
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
