<template lang="pug">
.events
  .heading__wrapper
    .heading {{ 'EVENTS' }}
    .heading__sub {{ subHeadingText }}

  template(v-if="!isNotInvited")
    .content
      .content__heading {{ 'HOLY MATRIMONY (ONSITE)' }}
      .content__item
        .item__text
          .item__main-info {{ 'Gereja Kristus Yesus (GKY)\nMangga Besar' }}
          .item__sub-info {{ 'Saturday, 6 January 2024,\n10:00 WIB (UTC+7)' }}
        .item__graphic.item__graphic--map(ref="holyMatrimonyMapElementRef")

  .content
    .content__heading {{ 'HOLY MATRIMONY (ONLINE)' }}
    .content__item
      .item__text
        .item__sub-info {{ 'Saturday, 6 January 2024,\n10:00 WIB (UTC+7)' }}
      //- TODO: Live Streaming Link
      iframe.item__graphic.item__graphic--embed(
        src="https://www.youtube.com/embed/RZ9V0-fAfE8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      )

  template(v-if="isReceptionInvitation") 
    .content(data-order="reverse")
      .content__heading {{ 'RECEPTION DINNER' }}
      .content__item
        .item__text
          .item__main-info {{ 'Sailendra Restaurant -\nJW Marriott Hotel Jakarta' }}
          .item__sub-info {{ 'Saturday, 6 January 2024, 18:00 WIB' }}
        .item__graphic.item__graphic--map(ref="receptionMapElementRef")
    .content
      .content__heading {{ 'RECEPTION DINNER RSVP' }}
      .content__item
        .rsvp__info
          .rsvp__description
            span.rsvp__description-text {{ 'Due to limited space, and to ensure the smooth running of the events, We kindly ask your cooperation by confirming your attendance to the dinner reception before' }}
            span.rsvp__description-text.rsvp__description-text--focus {{ 'November 30, 2023.' }}
          .rsvp__note 
            .rsvp__note-text.rsvp__note-text--focus {{ 'Unconfirmed attendance is considered as not attending.' }}
            .rsvp__note-text {{ ' We thank you for your kind understanding.' }}
        template(v-if="invitee")
          RSVPForm.rsvp__form(
            :invitee="invitee"
            :inviteeRSVP="databaseInviteeRSVP"
            @submit="handleSubmitRSVP"
          )

  template(v-if="invitee && inviteeRSVPToSubmit")
    ConfirmRSVPModal(
      :is-open="isConfirmRSVPModalOpen"
      :invitee="invitee"
      :inviteeRSVP="inviteeRSVPToSubmit"
      @close="handleCancelRSVPSubmission"
    )
</template>
<script lang="ts" setup>
import useMap from '~/composables/wedding/useMap'
import RSVPForm from '~/components/organisms/wedding/RSVPForm.vue'
import type { Invitee, InviteeRSVP } from '~/types/model/wedding/invitee'
import {
  getIsMatrimonyInvitation,
  getIsReceptionInvitation,
  getIsNotInvited,
} from '~/utils/wedding'
import ConfirmRSVPModal from '~/components/organisms/wedding/ConfirmRSVPModal.vue'

type Props = {
  invitee: Invitee | null
  databaseInviteeRSVP: InviteeRSVP | null
}

const props = defineProps({
  invitee: {
    type: Object as () => Props['invitee'],
    default: null,
  },
  databaseInviteeRSVP: {
    type: Object as () => Props['databaseInviteeRSVP'],
    default: null,
  },
})

const isReceptionInvitation = computed(() =>
  getIsReceptionInvitation(props.invitee?.invitationType)
)
const isMatrimonyInvitation = computed(() =>
  getIsMatrimonyInvitation(props.invitee?.invitationType)
)
const isNotInvited = computed(() => getIsNotInvited(props.invitee?.invitationType))

const subHeadingText = computed(() => {
  if (isReceptionInvitation.value)
    return "We would love to have your presence and blessings at our marriage's holy matrimony and dinner reception."
  if (isMatrimonyInvitation.value)
    return "We would love to have your presence and blessings at our marriage's holy matrimony."
  return "We would love to have your presence and blessings at the live streaming of our marriage's holy matrimony."
})

const { receptionMapElementRef, holyMatrimonyMapElementRef } = useMap()

const isConfirmRSVPModalOpen = ref(false)
const inviteeRSVPToSubmit = ref<InviteeRSVP>()
const handleSubmitRSVP = (inviteeRSVP: InviteeRSVP) => {
  isConfirmRSVPModalOpen.value = true
  inviteeRSVPToSubmit.value = inviteeRSVP
}
const handleCancelRSVPSubmission = () => {
  isConfirmRSVPModalOpen.value = false
  inviteeRSVPToSubmit.value = undefined
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
.item {
  &__text {
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

  &__main-info {
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
  &__sub-info {
    @include sp {
      @include font($size: $font-sm);
      margin-bottom: 16px;
      white-space: pre-wrap;
    }
  }

  &__graphic {
    width: 100%;
    max-width: 750px;
    margin-top: 4px; // NOTE: 地図の上が住所のテキストの上と揃うように

    @include pc {
      height: 300px;
    }
    @include sp {
      height: 500px;
    }

    &--map {
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

    &--embed {
      @include sp {
        height: 200px;
      }
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
