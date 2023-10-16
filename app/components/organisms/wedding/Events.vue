<template lang="pug">
.events
  .heading__wrapper
    .heading {{ 'EVENTS' }}
    .heading__sub {{ subHeadingText }}

  template(v-if="!isNotInvited")
    .content
      .content__heading {{ 'HOLY MATRIMONY' }}
      .content__item
        .item__text
          .item__main-info {{ 'Gereja Kristus Yesus (GKY)\nMangga Besar' }}
          .item__sub-info {{ 'Saturday, 6 January 2024,\n10:00 WIB (UTC+7)' }}
        .item__graphic.item__graphic--map(ref="holyMatrimonyMapElementRef")

  template(v-if="isReceptionInvitation") 
    .content(data-order="reverse")
      .content__heading {{ 'RECEPTION DINNER' }}
      .content__item
        .item__text
          .item__main-info {{ 'Sailendra Restaurant -\nJW Marriott Hotel Jakarta' }}
          .item__sub-info {{ 'Saturday, 6 January 2024, 18:00 WIB' }}
        .item__graphic.item__graphic--map(ref="receptionMapElementRef")
  template(v-if="shouldShowRSVPSection")
    .content
      .content__heading {{ 'RSVP' }}
      .content__item
        MRSVPNotes(:inviteeRSVP="databaseInviteeRSVP")
      .content__button(@click="handleClickRSVPButton") {{ databaseInviteeRSVP ? 'Review Your RSVP' : 'RSVP Here' }}
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import MRSVPNotes from '~/components/molecules/wedding/MRSVPNotes.vue'
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
  invitee: Invitee
  databaseInviteeRSVP: InviteeRSVP | null
}

const props = defineProps({
  invitee: {
    type: Object as () => Props['invitee'],
    required: true,
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

const config = useRuntimeConfig().public.wedding

const shouldShowRSVPSection = computed(() => {
  if (!isReceptionInvitation.value) return false
  if (props.databaseInviteeRSVP) return true
  return dayjs().isSameOrBefore(dayjs.unix(config.rsvpDeadline))
})

const emit = defineEmits(['RSVPButtonClick'])

const handleClickRSVPButton = () => {
  emit('RSVPButtonClick')
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

    @include sp {
      margin-bottom: 16px;
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
      white-space: pre-wrap;
    }
  }

  &__hr {
    margin: 16px 0;
    color: rgba($white, 0.25);
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
  }
}

@mixin floating-button {
  @include font-family('marcellus');
  display: inline-block;
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
}

.content__button {
  @include floating-button;
  text-decoration: none;
  color: inherit;
  margin-top: 16px;
}
</style>
