<template lang="pug">
.songlist
  .bg
    img.bg__image(src="~/assets/images/wedding/kv.jpg")
  .content
    .tagline
      .tagline__group
        .tagline__item.tagline__item--main.tagline__item--ja 恵みを語るメロディー
        .tagline__item.tagline__item--sub.tagline__item--cursive The Melody of Grace
      .tagline__rgroup
        .tagline__item.tagline__item--main DARIEN & DAISY
        .tagline__item.tagline__item--sub 6 January 2024
    .heading
      .heading__main {{ 'KNOW US MORE' }}
      .heading__sub {{ 'Through Songs We Love' }}

    .description
      .description__text {{ 'These are the list of songs curated by the couple to accompany us through the dinner reception.' }}
      .description__text {{ 'They tell stories about their lives, both as an individual and as a couple.' }}
      .description__text {{ 'While listening to the melodies, take a look below for how these songs shape and identify them.' }}

    .list
      template(v-for="(song, index) in songList")
        .list__item-wrapper
          .list__item.item
            .item__head(@click="handleClickAccordion(index)")
              .item__title {{ `${song.title} - ${song.author}` }}
              .item__theme {{ song.theme.join(', ') }}
              Transition(name="fade")
                .item__accordion-btn.material-icons-outlined(v-if="isSongDescriptionOpen(index)") expand_less
                .item__accordion-btn.material-icons-outlined(v-else) expand_more
            .item__description-wrapper(:style="{ height: songHeight(index) }")
              .item__description(ref="songDescriptionRef")
                template(v-for="description in song.description")
                  .item__description-text {{ description }}
</template>
<script setup lang="ts">
// --------------------------------------------------
// Song List
// --------------------------------------------------

type Song = {
  title: string
  author: string
  theme: string[]
  description: string[]
}

type SongState = {
  height: string
  isOpen: boolean
}

const songList: Song[] = [
  {
    title: 'I am Here Because of Your Grace',
    author: 'Welyar Kauntu',
    theme: ['Christianity'],
    description: [
      'The song that perfectly describes how we see our lives and our relationship, hence our tagline for this wedding: Melody of Grace / 恵みを語るメロディー.',
      'Who are both of us but despicable sinners not worthy of love, yet God gave His own Son - Jesus Christ - to save us from eternal lovelessnes,',
      'and to grace us with the opportunity to taste the teaser of true love through this wedding we all enjoy together.',
    ],
  },
  {
    title: 'Rainbow Connection',
    author: 'Diana Panton',
    theme: ['Misc.'],
    // TODO
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  },
  {
    title: 'My Everything',
    author: 'Glenn Fredly',
    theme: ['High School', 'Music'],
    description: [
      "While he is not part of the school's official band (Cressendo), at least he shares some of the so-called musician's taste with those cool people in Cressendo.",
      'This song exemplifies their taste of music at that time, and he strived to be able to enjoy and to be able to add songs like this to his repertoire.',
      'This period was where he first learned the existence of chords outside the basic ones (major, minor, dominant seventh), with major/minor seventh chords being the chords he practiced the most to be able to use.',
      'You will hear those major/minor seventh chords whenever he plays, to the point that he got criticized for overusing them. he he.',
    ],
  },
  {
    title: 'Just the Two Of Us',
    author: 'Stevie Wonder',
    theme: ['High School', 'Music'],
    description: [
      'A song he played with his talented highschool friends in a school event.',
      'Masterful drumming, cool rap, exquisite jazzy voice, combined the "Front Pembela Ronald!" (the name of the band they made for the event) chant heard accross the auditorium when they were performing made an unforgettable memory for him.',
      'That was his very first experience playing with a band outside of church.',
    ],
  },
  {
    title: 'Merakit Perahu',
    author: 'HiVi!',
    theme: ['Relationship'],
    description: [
      'A song that he likes so much, and she knows about it.',
      'The day after her rejection towards his feelings, the radio she were tuning in, in pure coincidence, played this song, which brought the remembrance of him, and together with it, mixed feelings, to her.',
      'While being in a relationship with him was not an option (at that time), thought of having their friendship also ended made her gloomy, to say the least.',
    ],
  },
  {
    title: 'Christ is Enough',
    author: 'Hillsong',
    theme: ['Relationship', 'Christianity'],
    description: [
      'While being rejected is admittedly a hard pill to swallow, looking at his (a little bit too) disgraceful appearance, His senior said this to him:',
      'Is Christ Enough for you?',
      'He played that song nonstop through his spotify for weeks afterwards.',
    ],
  },
  {
    title: "Siapkah Kau 'Tuk Jatuh Cinta Lagi",
    author: 'HiVi!',
    theme: ['Relationship'],
    description: ['The song that he played for her to mark the start of their relationship.'],
  },
  {
    title: 'I See The Light',
    author: 'Tangled',
    theme: ['Relationship'],
    description: [
      'The first song they played together (after they decided to be together, obviously). The lyrics somewhat describes how she changed her perspective about him.',
      "And at last I see the light // And it's like the fog has lifted // And at last I see the light // And it's like the sky is new",
      'All at once everything looks different // Now that I see you',
    ],
  },
  {
    title: "You've Got A Friend",
    author: 'McFly',
    theme: ['Friendship'],
    description: [
      'Friendship has a apex importance in our lives.',
      "If not because of our friends working behind the scene encouraging us to stick together again after the separation, we won't be here at the first place.",
      'We also would like to see ourselves being friends in addition to being lovers, because while what we sometimes thought as love burns fast, friendship, we believe, is part of the anchor of unfailing love.',
    ],
  },
  {
    title: 'Tak Di Tanganku',
    author: 'Juicy Luicy',
    theme: ['Relationship'],
    description: [
      '3 Years of Jakarta - Kamakura (Japan) LDR, followed by another year of York (UK) - Jakarta LDR.',
      'This song depicts what LDR life is, especially the York - Jakarta part.',
    ],
  },
  {
    title: 'I Can Wait Forever',
    author: 'Air Supply',
    theme: ['Relationship'],
    // TODO
    description: [
      'Another song that reflects our LDR lives; a long and important phase of our relationship.',
    ],
  },
  {
    title: 'Negeri Di Awan',
    author: 'Katon Bagaskara',
    theme: ['Music'],
    description: [
      'The lyrics are not the reason why he loves this song so much.',
      'The notation choices, chord progressions, scale changes, interludes.... they are the reason.',
      'This song is truly peak Indonesian Ballad.',
    ],
  },
  {
    title: 'Anyone At All',
    author: "Carole King (You've Got Mail)",
    theme: ['Misc.'],
    description: [
      '"Don\'t you think daisies are the friendliest flower?"',
      'That is part of the conversation being played at the film.',
      'But don\'t we agree that such description also fits with the "Daisy" we have here?',
    ],
  },
  {
    title: 'Jesus It Is You',
    author: 'JPCC Worship (formerly True Worshippers)',
    theme: ['Christianity'],
    description: [
      'Who sees my brokenness and carries me when I am frail and weak? Who brings me food for my table, who cares for all of my needs?',
      'We are but helpless people, floating only by the Grace of Jesus Christ through everyone around us (families, friends, churches, workplaces, and you. Yes, you. Thankyou for being part of our lives.)',
      'To the one thing true, Jesus, It Is You.',
    ],
  },
]

const songDescriptionRef = ref<HTMLElement[]>([])
const songState = ref<SongState[]>(songList.map(() => ({ height: 'auto', isOpen: false })))

onMounted(() => {
  songDescriptionRef.value.forEach((val, index) => {
    songState.value[index].height = `${val.clientHeight}px`
  })
})

const isSongDescriptionOpen = (index: number) => songState.value[index].isOpen
const songHeight = (index: number) =>
  songState.value[index].isOpen ? songState.value[index].height : 0

const handleClickAccordion = (clickedIndex: number) => {
  songState.value = songState.value.map((val, index) => ({
    ...val,
    isOpen: clickedIndex !== index ? false : !val.isOpen,
  }))
}

// --------------------------------------------------
// Meta Tags
// --------------------------------------------------

const BASE_URL = 'https://darienjonathan.com'
const url = `${BASE_URL}/daisy/wedding/songlist`

const title = 'Darien & Daisy | Wedding Songlist'

const description = 'Wedding of Darien Jonathan & Daisy Christina: Song List'

const image = `${BASE_URL}/ogp-wedding.jpg`

const meta = computed(() => {
  const metaArr: Record<string, string>[] = [
    {
      name: 'og:url',
      content: image,
    },
    {
      name: 'og:image',
      content: image,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ]

  metaArr.push(
    ...['og:title', 'twitter:title'].map(name => ({
      name,
      content: title,
    }))
  )
  metaArr.push(
    ...['description', 'og:description', 'twitter:description'].map(name => ({
      name,
      content: description,
    }))
  )
  metaArr.push(
    ...['og:image', 'twitter:image'].map(name => ({
      name,
      content: image,
    }))
  )
  return metaArr
})

useHead({
  title,
  meta: meta.value,
  link: [
    {
      rel: 'canonical',
      href: url,
    },
  ],
})

definePageMeta({
  layout: 'base',
})
</script>
<script lang="ts">
export default {
  name: 'WeddingSongList',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.songlist {
  min-height: 100vh;
  background-color: rgba($wedding_brown, 1);
}

.bg {
  & {
    @include size(vw(100), 100vh);
    position: fixed;
    top: 0;
    transition: filter 1s;
    filter: blur(15px);

    &::after {
      @include size(100%, 100%);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      background-color: rgba($black, 0.25);
    }
  }

  &__image {
    @include size(100%, 100%);
    @include absolute;
    object-fit: cover;
  }
}

.content {
  position: relative;
  @include pc {
    padding: 20px 40px;
  }

  @include sp {
    padding: 20px;
  }
}

.description {
  & {
    margin-bottom: 40px;
  }

  &__text {
    @include font($line-height: 1.4);
    @include sp {
      @include font($size: $font-sm, $line-height: 1.4);
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.tagline {
  @include flex($justify: space-between);
  margin-bottom: 30px;

  &__item {
    @include font-family('marcellus');
    @include flex($direction: column);
    text-align: center;

    &--main {
      @include font($size: $font-lg, $letter-spacing: 0.2rem);
      margin-bottom: 6px;

      @include sp {
        @include font($size: $font-sm, $letter-spacing: 0.1rem);
      }
    }

    &--sub {
      @include font($letter-spacing: 0.1rem);
      @include sp {
        @include font($size: $font-xs, $letter-spacing: 0.05rem);
      }
    }

    &--ja {
      @include font-family('biz-ud-mincho');
    }

    &--cursive {
      @include font-family('rochester');
    }
  }
}

.heading {
  @include font-family('marcellus');
  text-align: center;
  margin-bottom: 60px;

  &__main {
    @include font($size: $font-huge);
    margin-bottom: 4px;
  }

  &__sub {
    @include font($size: $font-lg);
  }
}

.list {
  & {
    display: grid;
    gap: 24px;

    @include pc {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__item {
    box-shadow: 0 0 10px 0.5px rgba($white, 0.5);

    @include pc {
      padding: 16px;
    }

    @include sp {
      padding: 12px;
    }
  }
}

.item {
  &__head {
    display: grid;
    gap: 4px 16px;
    grid-template-areas:
      'title accordion-btn'
      'theme accordion-btn';
    grid-template-columns: 1fr auto;
    align-content: center;
    cursor: pointer;
  }

  &__title,
  &__theme {
    @include font-family('marcellus');
  }

  &__title {
    grid-area: title;

    @include pc {
      @include font($size: $font-lg);
    }
  }

  &__theme {
    @include sp {
      @include font($size: $font-sm);
    }
    grid-area: theme;
  }

  &__accordion-btn {
    @include font($size: $font-huge);
    grid-area: accordion-btn;
    align-self: center;
    justify-self: center;
  }

  &__description-wrapper {
    overflow: hidden;
    transition: height 0.25s ease-in-out;
  }

  &__description {
    @include font($line-height: 1.6);
    padding: 12px 0 0 6px;

    @include sp {
      @include font($size: $font-sm, $line-height: 1.6);
    }
  }

  &__description-text {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
