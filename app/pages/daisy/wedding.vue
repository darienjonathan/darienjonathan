<template lang="pug">
.wedding
  Transition(
    name="fade"
    mode="out-in"
    @afterEnter="defineViewportVariables"
  )
    template(v-if="!isLoadingDone")
      ALoading.loading
    template(v-else)
      .wrapper
        Hero.hero(
          :invitation-type="invitee.invitationType"
          @nav-click="handleNavClick"
        )
        .content
          Events.events(
            :invitee="invitee"
            ref="eventsElementRef"
          )
          AboutUs.about-us
</template>
<script lang="ts" setup>
import ALoading from '~/components/atoms/ALoading.vue'
import Hero from '~/components/organisms/wedding/Hero.vue'
import Events from '~/components/organisms/wedding/Events.vue'
import type { Invitee } from '~/types/model/wedding/invitee'
import AboutUs from '~/components/organisms/wedding/AboutUs.vue'

const isLoadingDone = ref(false)
const { defineViewportVariables } = useViewportUnitSizes()
onMounted(() => {
  isLoadingDone.value = true
})

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

const invitee: Invitee = {
  name: 'Darien Jonathan',
  invitationType: 'reception',
  maxGuestNumber: 2,
} as Invitee

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

  .events {
    background-image: linear-gradient(
      to bottom,
      transparent,
      rgba($wedding_brown, 1) 50%,
      rgba($wedding_brown, 1) calc(100% - 20px),
      transparent
    );
    padding: 60px 20px;
  }

  .about-us {
    padding: 60px 0;
  }
}
</style>
