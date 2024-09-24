<template lang="pug">
.m-post-list-item
  .post__properties
    .post__title {{ getContent(post.title) }}
    .post__description {{ getContent(post.description) }}
  .post__bottom
    .post__draft {{ 'Post Status: ' + (post.isDraft ? 'Draft' : 'Live') }}
    .post__actions
      .post__action.material-icons-outlined(@click="$emit('edit')") edit
      .post__action.material-icons-outlined(@click="$emit('delete')") delete
</template>
<script lang="ts" setup>
import type { Post } from '~/types/model/blog/post'
import { getContent } from '~/utils/blog/getContent'

defineOptions({
  name: 'MPostListItem',
})

type Props = {
  post: Post
}

defineProps<Props>()
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

$content-padding: 12px;

.m-post-list-item {
  border: 2px solid white;
}
.post {
  &__properties,
  &__bottom {
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

  &__bottom {
    @include flex($justify: space-between);
  }

  &__draft {
    @include font($size: $font-xs);
  }

  &__actions {
    @include flex;
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
