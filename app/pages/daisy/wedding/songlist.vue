<template lang="pug"></template>
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

const songList: Song[] = [
  {
    title: 'I am Here Because of Your Grace',
    author: 'Welyar Kauntu',
    theme: ['Christianity'],
    description: [
      'The song that perfectly describes how we see our lives and our relationship, hence our tagline for this wedding: Melody of Grace / 恵みを語るメロディー.',
      'Who are both of us but despicable sinners not worthy of love, yet God gave His own Son - Jesus Christ - to save us from eternal lovelessnes,',
      'and to grace us with the opportunity to taste the shadow of true love through this relationship and this wedding we all enjoy together.',
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
      "While he is not part of the school's official band (Cressendo), at least he shares the so-called musician's taste with those cool people in Cressendo.",
      'This song exemplifies our taste of music at that time, and he strived to be able to enjoy and to be able to add songs like this to his repertoire.',
      'This period was where he first learned the existence of chords outside the basic ones (major, minor, dominant seventh), with major/minor seventh chords being the chords he practiced the most to be able to use.',
    ],
  },
  {
    title: 'Just the Two Of Us',
    author: 'Stevie Wonder',
    theme: ['High School', 'Music'],
    description: [
      'A song he played with his talented highschool friends in a school event.',
      'Masterful drumming, cool rap, exquisite jazzy voice, added with the chant of "Front Pembela Ronald!" (the name of the band we made for the event) made an unforgettable memory for him.',
      'That was his very first experience playing with a band outside of church.',
    ],
  },
  {
    title: 'Merakit Perahu',
    author: 'HiVi!',
    theme: ['Relationship'],
    description: [
      'The song that he likes so much, and she knows about it.',
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
      'We also would like to see ourselves being friends in addition to being lovers, because while what we sometimes thought as love burns fast, friendship is part of the anchor of unfailing love.',
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
      'He does not really care about the lyrics of this song.',
      'However, the notation choices, chord progressions, scale changes, interludes.... wow.',
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
<style lang="scss" scoped></style>
