<template lang="pug">
.m-media-list-item
  img.media__src(
    v-if="media.type === 'image'"
    :src="url"
  )
  video.media__src(
    v-else-if="media.type === 'video'"
    :src="url"
  )
  .media__properties
    .media__property {{ media.fileName }}
    .media__property.media__property--caption {{ media.caption || '-' }}
  .media__actions
    .media__action.material-icons-outlined(@click="$emit('edit')") edit
    .media__action.material-icons-outlined(@click="$emit('delete')") delete
</template>
<script lang="ts" setup>
import type { Media } from '~/types/model/blog/media'

defineOptions({
  name: 'MMediaListItem',
})

type Props = {
  media: Media
}

const props = defineProps<Props>()
const storage = useNuxtApp().$firebase.storage
const url = ref()
watch(
  () => props.media.fileLocation,
  async location => {
    url.value = await storage.getDownloadURL(location)
  },
  {
    immediate: true,
  },
)
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.m-media-list-item {
  display: grid;
  grid-template-columns: 1fr 60px;
  @include pc {
    grid-template-areas:
      'src src'
      'properties actions';
    gap: 8px;
    max-width: 300px;
  }
  @include sp {
    grid-template-areas:
      'src src'
      'properties properties'
      'actions actions';
    gap: 4px;
    max-width: 175px;
  }
}
.media {
  &__src {
    @include size(100%, 100%);
    grid-area: src;
    object-fit: contain;
    @include pc {
      max-height: 300px;
    }
    @include sp {
      max-height: 175px;
    }
  }

  &__properties {
    grid-area: properties;
  }

  &__property {
    @include font-family('roboto-slab');
    @include font($size: $font-sm, $line-height: 1.5);
    &--caption {
      @include font-family('cabin');
      @include font($size: $font-xs, $line-height: 1.5);
    }
  }

  &__actions {
    @include flex($justify: flex-start);
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
