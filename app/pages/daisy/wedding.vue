<template lang="pug">
.wedding
  MPageLoading(:is-loading="isLoading")
    .wrapper
      Hero.hero(
        :invitee="invitee"
        @nav-click="handleNavClick"
        @loading-done="handleLoadingDone"
      )
      .content
        Events.events(
          :invitee="invitee"
          :databaseInviteeRSVP="inviteeRSVP"
          ref="eventsElementRef"
        )
        AboutUs.about-us
        OurStory.our-story
        .wishes__wrapper
          Wishes.wishes
</template>
<script lang="ts" setup>
import Hero from '~/components/organisms/wedding/Hero.vue'
import Events from '~/components/organisms/wedding/Events.vue'
import type { Invitee, InviteeRSVP } from '~/types/model/wedding/invitee'
import AboutUs from '~/components/organisms/wedding/AboutUs.vue'
import MPageLoading from '~~/components/molecules/MPageLoading.vue'
import OurStory from '~~/components/organisms/wedding/OurStory.vue'
import Wishes from '~~/components/organisms/wedding/Wishes.vue'
import useUid from '~~/composables/wedding/useUid'

const isMounted = ref(false)
const isHeroImageLoaded = ref(false)
const isLoading = computed(() => !isMounted.value || !isHeroImageLoaded.value)

onMounted(() => {
  isMounted.value = true
})

const handleLoadingDone = () => {
  isHeroImageLoaded.value = true
}

const eventsElementRef = ref<InstanceType<typeof Events> | null>()
const handleNavClick = () => {
  if (!eventsElementRef.value) return
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const element = eventsElementRef.value.$el as HTMLElement
  const eventsTop = element.getBoundingClientRect().top
  scrollTo(0, eventsTop)
}

// --------------------------------------------------
// User Data
// --------------------------------------------------

const { uid } = useUid()
const { useInvitees, useInviteeRSVP } = useFirestoreCollections()
const inviteesFirestore = useInvitees()
const inviteeRSVPFirestore = useInviteeRSVP()

const invitee = ref<Invitee | null>()
const inviteeRSVP = ref<InviteeRSVP | null>()

// dummy
watch(
  uid,
  () => {
    if (uid.value === 'DUMMY') {
      invitee.value = {
        name: 'Kevin Jonathan',
        invitationType: 'reception',
        inviteeSuffix: 'family',
        databasePhoneNumber: '+6281234567890',
        adultGuestNumber: 1,
        childrenGuestNumber: 1,
      }
    }
  },
  {
    immediate: true,
  }
)

watch(
  uid,
  async () => {
    if (!uid.value) return

    const fetchedInvitee = await inviteesFirestore.loadDocument(uid.value)
    const fetchedInviteeRSVP = await inviteeRSVPFirestore.loadDocument(uid.value)

    invitee.value = fetchedInvitee
    inviteeRSVP.value = fetchedInviteeRSVP
  },
  {
    immediate: true,
  }
)

// --------------------------------------------------
// Meta Tags
// --------------------------------------------------

const url = 'https://darienjonathan.com/daisy/wedding'
const title = 'Darien & Daisy | Wedding Invitation'

// TODO: description
const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

// TODO: OGP Image
const image = url + '/'

const meta = computed(() => {
  const metaArr: Record<string, string>[] = [
    {
      name: 'og:url',
      content: url,
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
})
</script>
<script lang="ts">
definePageMeta({
  layout: 'base',
})
export default {
  name: 'WeddingPage',
  components: { MPageLoading, Hero, Events, AboutUs, OurStory, Wishes },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';
.wedding {
  overflow-x: hidden;

  .loading {
    @include absolute-center;
  }

  .hero {
    position: relative;
  }

  .content {
    position: relative;
  }

  .events,
  .about-us,
  .wishes {
    padding: 60px 20px;
  }

  .our-story {
    padding: 60px 40px;
  }

  .events {
    background-image: linear-gradient(
      to bottom,
      transparent,
      rgba($wedding_brown, 1) 50%,
      rgba($wedding_brown, 1) calc(100% - 20px),
      transparent
    );
  }

  .wishes {
    &__wrapper {
      position: relative;
      &::before {
        @include size(100%, 100%);
        @include absolute($top: 0, $left: 0);
        content: '';

        // TODO: change with proper background
        background-image: url('@/assets/images/wedding/story/story_1.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.2;
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0)
        );
      }
    }

    & {
      position: relative;
    }
  }
}
</style>
