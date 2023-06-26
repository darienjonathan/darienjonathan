<template lang="pug">
.our-story
  .heading__wrapper
    .heading {{ 'OUR STORY' }}
  .story
    template(v-for="(story, index) in stories")
      .story__item(@click="handleStoryClick(index)")
        img.story__thumbnail(:src="story.thumbnail")
        .story__summary.summary
          .summary__text {{ story.summary }}
          .summary__read-more {{ 'Read More' }}
  template(v-if="selectedStoryIndex !== undefined")
    StoryModal(
      :is-open="isStoryModalOpen"
      :story="stories[selectedStoryIndex]"
      @close="handleCloseStoryModal"
    )
</template>
<script lang="ts" setup>
import StoryModal from '~/components/organisms/wedding/StoryModal.vue'
import type { Story } from '~/types/model/wedding/story'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const stories: Story[] = [...new Array(6)].map((_, index) => {
  const storyNum = index + 1
  return {
    title: `story ${storyNum} title`,
    thumbnail: getDynamicAssetUrl('images/wedding/story/story_1.png'),
    summary: `story ${storyNum} summary`.repeat(20),
    contents: `story ${storyNum} full content /`.repeat(20).split('/'),
  }
})

const isStoryModalOpen = ref<boolean>(false)
const selectedStoryIndex = ref<number | undefined>()
const handleStoryClick = (index: number) => {
  selectedStoryIndex.value = index
  isStoryModalOpen.value = true
}

const handleCloseStoryModal = () => {
  selectedStoryIndex.value = undefined
  isStoryModalOpen.value = false
}
</script>
<script lang="ts">
export default {
  name: 'OurStory',
  components: { StoryModal },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.our-story {
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  &__wrapper {
    margin-bottom: 60px;
  }

  & {
    @include font-family('marcellus');
    text-align: center;
    margin-bottom: 20px;
    @include pc {
      @include font($size: $font-xhuge);
    }
    @include sp {
      @include font($size: $font-huge);
    }
  }
}

.story {
  &__item {
    margin-bottom: 40px;
    cursor: pointer;
    @include pc {
      display: flex;
    }
  }

  &__thumbnail {
    @include pc {
      width: 400px;
      max-width: 50%;
      margin-right: 20px;
    }
    @include sp {
      width: 300px;
      max-width: 100%;
      margin-bottom: 12px;
    }
  }
  &__summary {
    @include pc {
      @include font($size: $font-m);
    }
    @include sp {
      @include font($size: $font-sm);
    }
    .summary {
      &__text {
        margin-bottom: 8px;
      }
      &__read-more {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
