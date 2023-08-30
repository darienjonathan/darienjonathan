<!-- eslint-disable vue/multi-word-component-names -->
<template lang="pug">
.hero
  .hero__filler
    .hero__button-intersection-observer(ref="buttonObserverElementRef")
    .hero__intersection-observer(ref="observerElementRef")
  .hero__content(:data-is-blur="isBlur")
    NuxtImg.hero__image(
      preload
      :src="'wedding/kv/kv-4.jpg'"
      :quality="50"
      @load="handleHeroImageLoaded"
    )
    .hero__invitation-text.invitation-text
      .invitation-text__type {{ invitationTypeText }}
      .invitation-text__name {{ inviteeNameText }}
    .hero__kv.kv
      .kv__subheading.kv__subheading--jp {{ '恵みを語るメロディー' }}
      .kv__subheading.kv__subheading--en {{ 'The Melody of Grace' }}
      .kv__heading {{ 'DARIEN & DAISY' }}
      .kv__line
      .kv__date {{ 'Saturday, 6 January 2024' }}
      .kv__nav-btn
        .nav-btn__icon.material-icons-outlined expand_more
        .nav-btn__text(@click="emit('navClick')") {{ 'Events' }}

    template(v-if="invitee")
      .rsvp-button(
        @click="handleClickRSVPButton"
        :data-is-blur="isButtonBlur"
      ) {{ inviteeRSVP ? 'Review Your RSVP' : 'RSVP' }}
</template>
<script lang="ts" setup>
import type { Invitee, InviteeRSVP } from '~/types/model/wedding/invitee'
import { getIsReceptionInvitation, getIsMatrimonyInvitation } from '~/utils/wedding'

type Props = {
  invitee: Invitee | null
  inviteeRSVP: InviteeRSVP | null
}

const props = defineProps({
  invitee: {
    type: Object as () => Props['invitee'],
    default: null,
  },
  inviteeRSVP: {
    type: Object as () => Props['inviteeRSVP'],
    default: null,
  },
})

const isReceptionInvitation = computed(() =>
  getIsReceptionInvitation(props.invitee?.invitationType)
)
const isMatrimonyInvitation = computed(() =>
  getIsMatrimonyInvitation(props.invitee?.invitationType)
)

const invitationTypeText = computed(() => {
  if (isReceptionInvitation.value) return 'Holy Matrimony & Wedding Reception Invitation'
  if (isMatrimonyInvitation.value) return 'Holy Matrimony Invitation'
  return ''
})

const inviteeNameText = computed(() => {
  const baseText = `For ${props.invitee?.name || ''}`
  if (props.invitee?.inviteeSuffix === 'family') return `${baseText} & Family`
  if (props.invitee?.inviteeSuffix === 'partner') return `${baseText} & Partner`
  return ''
})

const emit = defineEmits(['loadingDone', 'navClick', 'RSVPButtonClick'])

const handleHeroImageLoaded = () => {
  emit('loadingDone')
}

// --------------------------------------------------
// Hero Intersection Observer
// --------------------------------------------------

const isBlur = ref(false)
const observerElementRef = ref<HTMLDivElement>()
const observerInstance = ref<IntersectionObserver>()
onMounted(() => {
  if (!observerElementRef.value) return
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries.find(e => e.target === observerElementRef.value)
      if (!entry) return
      isBlur.value = !entry.isIntersecting
    },
    {
      rootMargin: '0px',
      threshold: [0.0, 1.0],
    }
  )
  observer.observe(observerElementRef.value)
  observerInstance.value = observer
})

onUnmounted(() => {
  if (!observerInstance.value) return
  observerInstance.value.disconnect()
})

// --------------------------------------------------
// Buttons
// --------------------------------------------------

const isButtonBlur = ref(false)
const buttonObserverElementRef = ref<HTMLDivElement>()
const buttonObserverInstance = ref<IntersectionObserver>()
onMounted(() => {
  if (!buttonObserverElementRef.value) return
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries.find(e => e.target === buttonObserverElementRef.value)
      if (!entry) return
      isButtonBlur.value = !entry.isIntersecting
    },
    {
      rootMargin: '75px',
      threshold: [0.0, 1.0],
    }
  )
  observer.observe(buttonObserverElementRef.value)
  buttonObserverInstance.value = observer
})

onUnmounted(() => {
  if (!buttonObserverInstance.value) return
  buttonObserverInstance.value.disconnect()
})

const handleClickRSVPButton = () => {
  emit('RSVPButtonClick')
}
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Hero',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.hero {
  &__filler {
    @include size(vw(100), vh(100));
  }
  &__intersection-observer {
    padding-top: 30vh;
  }
  &__content {
    @include size(vw(100), vh(100));
    position: fixed;
    top: 0;
    transition: filter 1s;
    &[data-is-blur='true'] {
      filter: blur(15px);
    }
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
    filter: blur(3px);
  }

  &__invitation-text {
    @include font-family('marcellus');
    @include font($size: $font-sm);
    position: relative;
    text-align: center;
    text-shadow: 2px 2px 2px rgba($black, 0.25);
    z-index: 1;

    @include pc {
      margin-top: vh(15);
    }
    @include sp {
      margin-top: vh(15);
    }
  }
}

.invitation-text {
  &__type {
    margin-bottom: 4px;
  }
}

.kv {
  @mixin bounce-animation {
    @keyframes bounce {
      0% {
        transform: translateY(0px);
      }
      15% {
        transform: translateY(4px);
      }
      30% {
        transform: translateY(0);
      }
    }
    animation-name: bounce;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }

  & {
    @include absolute-center;
    @include flex(column);
    width: 100%;
    padding: 20px;
    // 親の疑似要素より前に出るように
    z-index: 1;
  }

  &__subheading {
    &--jp {
      @include font-family('biz-ud-mincho');
      @include font($size: $font-sm);
      text-align: center;
      margin-bottom: 8px;
    }
    &--en {
      @include font-family('rochester');
      @include font($size: $font-xxxl, $letter-spacing: 1.5px);
      white-space: pre;
      text-align: center;
      margin-bottom: 32px;
    }
  }

  &__heading {
    @include font-family('marcellus');
    text-align: center;
    font-size: 4rem;
  }
  &__line {
    height: 1px;
    background: $white;
    margin: 8px auto;
    @include pc {
      width: 400px;
    }
    @include sp {
      width: 100%;
    }
  }
  &__date {
    @include font-family('marcellus');
    @include font($size: $font-lg);
    line-height: 2;
    text-align: center;
    margin-bottom: 16px;
  }
  &__nav-btn {
    @include flex;
    @include font-family('marcellus');
    @include bounce-animation;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color 0.25s;
    &:hover {
      border-color: $white;
    }
  }
}

.nav-btn {
  &__icon {
    @include font($size: $font-xxl);
    margin-right: 4px;
  }

  &__text {
    @include font($size: $font-sm);
    cursor: pointer;
  }
}

@mixin floating-button {
  @include flex;
  @include font-family('marcellus');
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  min-width: 150px;
  height: 45px;
  padding: 10px 20px;
  border: 1px solid rgba($white, 0.5);
  border-radius: 8px;
  cursor: pointer;
  filter: drop-shadow(0 0 5px $white);
  transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out, opacity 0.5s;
  &:hover {
    background-color: rgba($white, 0.05);
  }

  &[data-scrolled='true'] {
    background-color: rgba($white, 0.75);
    color: rgba($wedding_brown, 1);
  }

  &[data-is-blur='true'] {
    pointer-events: none;
    cursor: auto;
    opacity: 0;
  }
}

.rsvp-button {
  @include floating-button;
  bottom: 75px;
  z-index: 1;
}
</style>
