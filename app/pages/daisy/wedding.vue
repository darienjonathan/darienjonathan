<template lang="pug">
.wedding
  MPageLoading(:is-loading="isLoading")
    .buttons-intersection-observer(ref="observerElementRef")
    .wrapper
      Hero.hero(
        :invitee="invitee"
        :inviteeRSVP="inviteeRSVP"
        @nav-click="handleNavClick"
        @loading-done="handleLoadingDone"
        @RSVPButtonClick="isRSVPModalOpen = true"
      )
      .content
        template(v-if="invitee")
          Events.events(
            :invitee="invitee"
            :databaseInviteeRSVP="inviteeRSVP"
            ref="eventsElementRef"
            @RSVPButtonClick="isRSVPModalOpen = true"
          )
        AboutUs.about-us
        OurStory.our-story(:invitee="invitee")
        Gallery.gallery
        .wishes__wrapper
          Wishes.wishes
        Registry.registry
        .line
        Closing.closing
        Footer.footer
  template(v-if="isDataLoaded && invitee")
    RSVP(
      :isRSVPModalOpen="isRSVPModalOpen"
      :invitee="invitee"
      :databaseInviteeRSVP="inviteeRSVP"
      @closeRSVPModal="isRSVPModalOpen = false"
      @promptUpdateInviteeRSVP="handleUpdateInviteRSVP"
    )
</template>
<script lang="ts" setup>
import { useProvideLoading } from '~/composables/dependencyInjection/useLoadingDependencyInjection'
import Hero from '~/components/organisms/wedding/Hero.vue'
import Events from '~/components/organisms/wedding/Events.vue'
import type { Invitee, InviteeRSVP } from '~/types/model/wedding/invitee'
import AboutUs from '~/components/organisms/wedding/AboutUs.vue'
import MPageLoading from '~~/components/molecules/MPageLoading.vue'
import OurStory from '~~/components/organisms/wedding/OurStory.vue'
import Wishes from '~~/components/organisms/wedding/Wishes.vue'
import useUid from '~~/composables/wedding/useUid'
import Gallery from '~~/components/organisms/wedding/Gallery.vue'
import Closing from '~~/components/organisms/wedding/Closing.vue'
import Footer from '~~/components/organisms/wedding/Footer.vue'
import RSVP from '~/components/organisms/wedding/RSVP.vue'
import Registry from '~/components/organisms/wedding/Registry.vue'

useProvideLoading('wedding')

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

const isDataLoaded = ref(false)
const invitee = ref<Invitee | null>()
const inviteeRSVP = ref<InviteeRSVP | null>()

// dummy
watch(
  uid,
  () => {
    if (uid.value === 'DUMMY') {
      invitee.value = {
        databaseName: 'Kevin Jonathan',
        invitationType: 'reception',
        inviteeSuffix: 'family',
        databasePhoneNumber: '+6281234567890',
        adultGuestNumber: 1,
        childrenGuestNumber: 1,
      }
    }
    if (uid.value === 'RSVP_DUMMY') {
      invitee.value = {
        databaseName: 'Kevin Jonathan',
        invitationType: 'reception',
        inviteeSuffix: 'family',
        databasePhoneNumber: '+6281234567890',
        adultGuestNumber: 1,
        childrenGuestNumber: 1,
      }
      inviteeRSVP.value = {
        name: 'Kevin Jonathan',
        adultGuestNumber: 1,
        childrenGuestNumber: 1,
        isAttendingReception: true,
        phoneNumber: '+6281234567890',
      }
    }

    isDataLoaded.value = true
  },
  {
    immediate: true,
  }
)

const setInvitee = async () => {
  if (!uid.value) return
  const fetchedInvitee = await inviteesFirestore.loadDocument(uid.value)
  invitee.value = fetchedInvitee
}

const setInviteeRSVP = async () => {
  if (!uid.value) return
  const fetchedInviteeRSVP = await inviteeRSVPFirestore.loadDocument(uid.value)
  inviteeRSVP.value = fetchedInviteeRSVP
}

watch(
  uid,
  async () => {
    await Promise.all([setInvitee(), setInviteeRSVP()])
    isDataLoaded.value = true
  },
  {
    immediate: true,
  }
)

// --------------------------------------------------
// RSVP
// --------------------------------------------------

const isRSVPModalOpen = ref(false)

const handleUpdateInviteRSVP = () => {
  setInviteeRSVP()
}

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

definePageMeta({
  layout: 'base',
})
</script>
<script lang="ts">
export default {
  name: 'WeddingPage',
  components: {
    MPageLoading,
    Hero,
    Events,
    AboutUs,
    OurStory,
    Wishes,
    Gallery,
    Closing,
    Registry,
    Footer,
    RSVP,
  },
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
  .gallery,
  .wishes,
  .registry {
    padding: 60px 20px;
  }

  .our-story,
  .closing {
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
    }

    & {
      position: relative;
    }
  }

  .line {
    margin: 0 auto;
    height: 1px;
    width: calc(100% - 2 * 40px);
    background-color: rgba($white, 0.5);
    @include pc {
      max-width: 1200px;
    }
  }

  .footer {
    width: 100%;
    background-color: rgba($wedding-brown, 0.5);
    box-shadow: 0 2px 30px 15px rgba($white, 0.5);

    @include pc {
      height: 50px;
    }

    @include sp {
      height: 100px;
    }
  }
}
</style>
