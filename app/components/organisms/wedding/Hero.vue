<!-- eslint-disable vue/multi-word-component-names -->
<template lang="pug">
.hero
  .hero__filler(:data-is-blur="isBlur")
    .hero__intersection-observer(ref="observerElementRef")
  .hero__content(:data-is-blur="isBlur")
    .kv
      .kv__invitation-type {{ invitationText }}
      .kv__subheading {{ 'The Playlist of Grace:' }}
      .kv__heading {{ 'DARIEN & DAISY' }}
      .kv__line
      .kv__date {{ 'Saturday, 6 January 2024' }}
      template(v-if="isReceptionInvitation || isMatrimonyInvitation")
        .kv__rsvp-btn
          .rsvp-btn__icon.material-icons-outlined expand_more
          .rsvp-btn__text(@click="emit('navClick')") {{ 'Events and RSVP' }}
</template>
<script lang="ts" setup>
import type { InvitationType } from '~/types/model/wedding/invitee'
import { getIsReceptionInvitation, getIsMatrimonyInvitation } from '~/utils/wedding'

type Props = {
  invitationType: InvitationType
}

const props = defineProps({
  invitationType: {
    type: String as () => Props['invitationType'],
    default: 'reception',
  },
})

const isReceptionInvitation = computed(() => getIsReceptionInvitation(props.invitationType))
const isMatrimonyInvitation = computed(() => getIsMatrimonyInvitation(props.invitationType))

const invitationText = computed(() => {
  if (isReceptionInvitation.value) return 'Holy Matrimony & Wedding Reception Invitation'
  if (isMatrimonyInvitation.value) return 'Holy Matrimony Invitation'
  return ''
})

const emit = defineEmits(['navClick'])

const isLoadingDone = ref(false)
onMounted(() => {
  isLoadingDone.value = true
})

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
</script>
<script lang="ts">
definePageMeta({
  layout: 'base',
})

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Hero',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.hero {
  &__filler,
  &__content {
    transition: filter 1s;
    &[data-is-blur='true'] {
      filter: blur(15px);
    }
  }
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
    &::before,
    &::after {
      @include size(100%, 100%);
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
    }
    &::before {
      background-image: url('@/assets/images/wedding/kv/kv-4.jpg');
      background-size: cover;
      // 画像によって調整する
      background-position: calc(50% + 45px) 50%;
      filter: blur(3px);
    }
    &::after {
      background-color: rgba($black, 0.25);
    }
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

  &__invitation-type {
    @include font-family('marcellus');
    @include font($size: $font-sm);
    text-align: center;
    margin-bottom: 48px;
  }

  &__subheading {
    @include font-family('rochester');
    @include font($size: $font-xxxl, $letter-spacing: 1.5px);
    white-space: pre;
    text-align: center;
    margin-bottom: 16px;
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
  &__rsvp-btn {
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

.rsvp-btn {
  &__icon {
    @include font($size: $font-xxl);
    margin-right: 4px;
  }

  &__text {
    @include font($size: $font-sm);
    cursor: pointer;
  }
}
</style>
