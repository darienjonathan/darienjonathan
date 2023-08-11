<template lang="pug">
.our-story
  .heading__wrapper
    .heading {{ 'OUR STORY' }}
  .story
    template(v-for="(story, index) in stories")
      .story__item(@click="handleStoryClick(index)")
        img.story__thumbnail(:src="story.thumbnail")
        .story__content.content
          .content__title {{ `${index + 1}. ${story.title}` }}
          .content__text {{ story.summary }}
          .content__read-more {{ 'Read More' }}
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
import story1 from '~/assets/images/wedding/story/story_1.png'
import story2 from '~/assets/images/wedding/story/story_2.png'
import story3 from '~/assets/images/wedding/story/story_3.png'
import story4 from '~/assets/images/wedding/story/story_4.png'
import story5 from '~/assets/images/wedding/story/story_5.png'
import story6 from '~/assets/images/wedding/story/story_6.png'
import story7 from '~/assets/images/wedding/story/story_7.png'

const stories: Story[] = [
  {
    title: 'Music Director and Pianist',
    thumbnail: story1,
    summary:
      'Their first meaningful interaction through melodies coming from the white and black they both know and love.',
    contents: 'story 1 full content /'.repeat(20).split('/'),
  },
  {
    title: '"お誕生日おめでとう、Daisy!"',
    thumbnail: story2,
    summary:
      'Living overseas and lonely, he looked at his snapchat friend list, hoping to find a companion for his lonely days, and this "Daisy" person left a nice impression for him through the aforementioned event. Hence, above message sent as a birthday greeting to her, hoping to start a conversation.',
    contents: 'story 2 full content /'.repeat(20).split('/'),
  },
  {
    title: 'He Thought He Had a Chance',
    thumbnail: story3,
    summary:
      'Apparently she is a very nice person, which motivated him to try taking the relationship to further stages. While geographical distance meant chat is the only way for him to win over her, things went exceptionally well, until he knew that he actually never had a chance.',
    contents: 'story 3 full content /'.repeat(20).split('/'),
  },
  {
    title: 'Is Christ Enough for Me?',
    thumbnail: story4,
    summary:
      'He left devastated. Seeking emergency guidance from his Christian Community senior, in which "Is Christ enough for you?" became the sentence of the day that pierced his heart deep for weeks. Oh, the senior also said something else, too.',
    contents: 'story 4 full content /'.repeat(20).split('/'),
  },
  {
    title: 'The Pain Was on Both Sides, and It Was Purposeful',
    thumbnail: story5,
    summary:
      'The separation was on good terms, so they tried to keep being friends after a reasonable amount of cut-off time. They soon found out that this cut-off time was a huge gamechanger for each of them personally, and for their relationship.',
    contents: 'story 5 full content /'.repeat(20).split('/'),
  },
  {
    title: 'The Sacred Search',
    thumbnail: story6,
    summary:
      'After things have settled, they agreed to try taking their friendship to the next level through an arguably very conservative and cautious way: book reading sessions to gauge the viability of this relationship.',
    contents: 'story 6 full content /'.repeat(20).split('/'),
  },
  {
    title: 'LDR after LDR; The Sacred Marriage',
    thumbnail: story7,
    summary:
      'There is really nothing to write home about this relationship, except the above-average amount of time they spent being separated geographically to pursue their own dreams, until they decided to pursue their dreams together as one, and here they are.',
    contents: 'story 7 full content /'.repeat(20).split('/'),
  },
]

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
    box-shadow: 0 0 30px $black;
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
  &__content {
    .content {
      &__title,
      &__text {
        margin-bottom: 8px;
      }

      &__text,
      &__read-more {
        @include pc {
          @include font($size: $font-m);
        }
        @include sp {
          @include font($size: $font-sm);
        }
      }

      &__title {
        @include font-family('marcellus');
        @include pc {
          @include font($size: $font-lg);
        }
        @include sp {
          @include font($size: $font-m);
        }
      }

      &__read-more {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
