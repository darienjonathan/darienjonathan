<template lang="pug">
.events(v-if="!isNotInvited")
  .heading__wrapper
    .heading {{ 'EVENTS' }}
    .heading__sub {{ subHeadingText }}
  template(v-if="isReceptionInvitation || isMatrimonyInvitation")
    .content
      .content__heading {{ 'HOLY MATRIMONY' }}
      .content__item
        .location__info
          .location__name {{ 'Gereja Kristus Yesus (GKY)\nMangga Besar' }}
          .location__date {{ 'Saturday, 6 January 2024,\n10:00 - 11:30 WIB (UTC+7)' }}
          // TODO: Live Streaming Link
        .location__map(ref="holyMatrimonyMapElementRef")
  template(v-if="isReceptionInvitation") 
    .content(data-order="reverse")
      .content__heading {{ 'RECEPTION DINNER' }}
      .content__item
        .location__info
          .location__name {{ 'Sailendra Restaurant -\nJW Marriott Hotel Jakarta' }}
          .location__date {{ 'Saturday, 6 January 2024, 18:00 WIB' }}
        .location__map(ref="receptionMapElementRef")
  .content
    .content__heading {{ 'RECEPTION DINNER RSVP' }}
    .content__item
      .rsvp__info
        .rsvp__description
          span.rsvp__description-text {{ rsvpText }}
          span.rsvp__description-text.rsvp__description-text--focus {{ 'November 30, 2023.' }}
        .rsvp__note 
          .rsvp__note-text.rsvp__note-text--focus {{ 'Unconfirmed attendance is considered as not attending.' }}
          .rsvp__note-text {{ ' We thank you for your kind understanding.' }}
      RSVPForm.rsvp__form(
        :invitee="invitee"
        @submit="handleSubmitRSVP"
      )
  ConfirmRSVPModal(
    v-if="!!inviteeToRSVP"
    :is-open="isConfirmRSVPModalOpen"
    :invitee="inviteeToRSVP"
    @close="handleCancelRSVPSubmission"
  )
</template>
<script lang="ts" setup>
import useMap from '~/composables/wedding/useMap'
import RSVPForm from '~/components/organisms/wedding/RSVPForm.vue'
import type { Invitee } from '~/types/model/wedding/invitee'
import {
  getIsMatrimonyInvitation,
  getIsReceptionInvitation,
  getIsNotInvited,
} from '~/utils/wedding'
import ConfirmRSVPModal from '~/components/organisms/wedding/ConfirmRSVPModal.vue'

type Props = {
  invitee?: Invitee
}

const props = defineProps({
  invitee: {
    type: Object as () => Props['invitee'],
    default: undefined,
  },
})

const isReceptionInvitation = computed(() =>
  getIsReceptionInvitation(props.invitee?.invitationType)
)
const isMatrimonyInvitation = computed(() =>
  getIsMatrimonyInvitation(props.invitee?.invitationType)
)
const isNotInvited = computed(() => getIsNotInvited(props.invitee?.invitationType))

const eventText = computed(() =>
  isReceptionInvitation.value
    ? 'holy matrimony and dinner reception'
    : isMatrimonyInvitation.value
    ? 'holy matrimony'
    : ''
)

const subHeadingText = computed(() => {
  if (!eventText.value) return
  return `We would love to have your presence and blessings at our marriage's ${eventText.value}.`
})

const rsvpText = computed(() => {
  if (!eventText.value) return ''
  return `Due to limited space, and to ensure the smooth running of the events, We kindly ask your cooperation by confirming your attendance to the ${eventText.value} before `
})

const { receptionMapElementRef, holyMatrimonyMapElementRef } = useMap()

const isConfirmRSVPModalOpen = ref(false)
const inviteeToRSVP = ref<Partial<Invitee>>()
const handleSubmitRSVP = (invitee: Partial<Invitee>) => {
  isConfirmRSVPModalOpen.value = true
  inviteeToRSVP.value = invitee
}
const handleCancelRSVPSubmission = () => {
  isConfirmRSVPModalOpen.value = false
  inviteeToRSVP.value = undefined
}
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Events',
  components: { RSVPForm, ConfirmRSVPModal },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.heading {
  &__wrapper {
    margin-bottom: 60px;
  }

  &,
  &__sub {
    @include font-family('marcellus');
    text-align: center;
  }

  & {
    margin-bottom: 20px;
    @include pc {
      @include font($size: $font-xhuge);
    }
    @include sp {
      @include font($size: $font-huge);
    }
  }
}

$reversed-content-class: ".content[data-order='reverse']";

.content {
  & {
    margin: 0 auto 40px;
    @include pc {
      max-width: 1200px;
    }
  }

  &__heading {
    padding-bottom: 16px;
    margin-bottom: 16px;
    width: 100%;
    border-bottom: 1px solid $white;
    @include pc {
      @include font($size: $font-huge);
    }
    @include sp {
      @include font($size: $font-xxxl);
    }
    #{$reversed-content-class} & {
      text-align: right;
    }
  }

  &__item {
    width: 100%;
    @include pc {
      @include flex($justify: space-between, $align-items: flex-start);
      #{$reversed-content-class} & {
        flex-direction: row-reverse;
      }
    }
  }
}
.location {
  &__info {
    @include pc {
      margin-right: 32px;
    }
    #{$reversed-content-class} & {
      text-align: right;
      @include pc {
        margin-right: 0;
        margin-left: 32px;
      }
    }
  }

  &__name {
    @include pc {
      @include font($size: $font-xxl);
      margin-bottom: 12px;
    }
    @include sp {
      @include font($size: $font-xl);
      margin-bottom: 4px;
      white-space: pre-wrap;
    }
  }
  &__date {
    @include sp {
      @include font($size: $font-sm);
      margin-bottom: 16px;
      white-space: pre-wrap;
    }
  }

  &__map {
    width: 100%;
    max-width: 750px;
    margin-top: 4px; // NOTE: 地図の上が住所のテキストの上と揃うように

    @include pc {
      height: 300px;
    }
    @include sp {
      height: 500px;
    }

    :deep(.address) {
      @include font-family('cabin');
      padding: 4px;
    }

    :deep(.address__title),
    :deep(.address__text) {
      @include font($size: $font-sm, $line-height: 1.25, $color: $wedding_brown);
    }

    :deep(.address__title) {
      font-weight: bold;
      padding-bottom: 2px;
    }

    :deep(.address__text) {
      padding-bottom: 4px;
    }

    :deep(.address__link) {
      @include flex($justify: flex-start);
      border-bottom: 1px solid $wedding-brown;
      padding-bottom: 2px;
      width: fit-content;
    }

    :deep(.link__icon) {
      @include font($size: $font-sm, $color: $wedding_brown);
      margin-right: 4px;
    }

    :deep(.link__href) {
      @include font($size: $font-sm, $color: $wedding_brown);
      text-decoration: none;
    }
  }
}

.rsvp {
  $content-margin: 30px;
  &__form {
    width: 100%;
    margin-top: 4px; // NOTE: 入力欄の上が予約説明のテキストの上と揃うように
    @include pc {
      max-width: calc(50% - $content-margin);
      margin-right: $content-margin;
      order: 0;
    }
  }
  &__info {
    margin-left: auto;
    @include pc {
      max-width: calc(50% - $content-margin);
      margin-left: $content-margin;
      order: 1;
    }
    @include sp {
      margin-bottom: 20px;
    }
  }
  &__description {
    margin-bottom: 12px;
    &-text--focus {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  &__note {
    @include font($size: $font-sm);
    &-text--focus {
      font-weight: bold;
    }
  }
}
</style>
