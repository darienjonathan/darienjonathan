<template lang="pug">
.our-story
  .heading__wrapper
    .heading {{ 'OUR STORY' }}
  .story
    template(v-for="(story, index) in stories")
      .story__item(@click="handleStoryClick(index)")
        NuxtImg.story__thumbnail(
          loading="lazy"
          :src="story.thumbnail"
        )
        .story__content.content
          .content__title {{ `${index + 1}. ${story.title}` }}
          .content__text {{ story.summary }}
          template(v-if="story.contents.length")
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

const stories: Story[] = [
  {
    title: 'Music Director and Pianist',
    thumbnail: 'wedding/story/story_1.png',
    summary:
      'Their first meaningful interaction through melodies coming from the white and black they both know and love.',
    contents: [
      "They were both studying under the same faculty in a certain university, albeit in different majors. While they were members of that faculty's Christian Community, essentialy they didn't know each other, until the community's certain Easter Celebration Event, in which he was assigned to be the music director for a worship team in which she took the pianist role. ",
      "They got along pretty well enough through the event's preparation. However, after the event ended, their communication also ended, since he was already graduated at that time, and after that event there were nothing that necessitates their presence in the same place and the same time.",
      'The most important thing, though, is that through that event they understand that both of them know and love piano, though in different ways. His reading speed is terrible his technical skill is a mess, while she was a classical piano teacher in a reputable music school. His practical experience outside of classical music somewhat makes up for his technical and knowledge shortcomings.',
      'Sometime later, he moved to another country for a job.',
    ],
  },
  {
    title: 'Is Christ Enough?',
    thumbnail: 'wedding/story/story_2.png',
    summary:
      'He tried to grow seeds of love that were planted there, but it was futile. "Is Christ enough for you?", said his senior who saw how pitiful he was in the wake of the rejection.',
    contents: [
      "Living overseas and lonely, he looked at his snapchat friend list, hoping to find a companion for his lonely days, and this 'Daisy' person left a nice impression for him through the aforementioned event. Hence, 「お誕生日おめでとう！」 message sent as a birthday greeting to her, hoping to start a conversation.",
      'Apparently she responded well, which motivated him to try taking the relationship to further stages. While geographical distance meant chat is the only way for him to win over her, things went exceptionally well.',
      'He actually never had a chance, though. As with other boys, he was stubborn eventhough she already gave some warning signals, until a strong word of rejection came, and ended it all. "The sparks were not there", she said. Music was enough to get them close, but not enough to bring them to the next step.',
      'Left devastated and unable to concentrate in work, he contacted his senior to pour his miserable heart, who responded with "Is Christ enough for you?" after seeing that I\'ve probably dethroned Jesus and in exchange put her on the pedestal of my heart.',
    ],
  },
  {
    title: 'The Sacred Search',
    thumbnail: 'wedding/story/story_3.png',
    summary:
      'They soon found out that this cut-off time was a huge gamechanger for each of them, though, in which they searched within themselves, who, or what, are they truly searching for.',
    contents: [
      'For the sake of both parties, they both agreed to amicably cut-off their communication for a while.',
      "While his efforts ended in a failure, this has become a very meaningful experience for him. Through this experience, he realized that while he considers himself as a Christian, there were only feint traces of Christianity in how he approach his dating life, which lead him to rethink his relationship with Jesus, and to learn about Christian's worldview of dating.",
      'Unexpectedly, she also gave a lot of thought about this relationship even after she rejected him. He is unattractive and unable to bring "the sparks" to the relationship, which he acknowledges and admits. However, while attractiveness is certainly an important aspect of a relationship, if what she is seeking is based on Christianity which main objective is Christ-centered marriage, attractiveness should not be that important so that they eclipse all other boring qualities he has which probably bring more value to achieve the objective, should it?',
      'After some time, she decided to take a huge gamble: to be very rational to herself by disregarding the absence of "the sparks" towards him, and hoping that he has enough other qualities that bring more value to the ideal relationship she envisages. In the end, she agreed to try making it work.',
      'To answer her faith in him making this relationship work, in addition to him actually understands very well that attractiveness is still a very important part to have a healthy and happy relationship, he tried (and still trying) his best to improve in that category.',
      'Thankfully, the gamble paid off. They went off to a flying start.',
    ],
  },
  {
    title: 'The Sacred Marriage',
    thumbnail: 'wedding/story/story_4.png',
    summary:
      'Finally, there is really nothing to write home about this relationship, except the above-average amount of time they spent being separated geographically to pursue their own dreams, until they decided to pursue their dreams together as one, and here they are.',
    contents: [],
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
