<template lang="pug">
AModal.rsvp-modal(
  :is-open="props.isOpen"
  :type="isSP ? 'full-size' : 'default'"
  @close="$emit('close')"
)
  .inner
    .heading
      h2.heading__main {{ inviteeRSVP ? 'Review Your RSVP' : 'RSVP' }}
    .content
      template(v-if="inviteeRSVP")
        .info
          span.info__description-text {{ 'You can review and update your RSVP details using below form through ' }}
          span.info__description-text.info__description-text--focus {{ 'November 30, 2023.' }}
      template(v-else)
        .info
          .info__description
            span.info__description-text {{ 'Due to limited space, and to ensure the smooth running of the events, We kindly ask your cooperation by confirming your attendance to the dinner reception before ' }}
            span.info__description-text.info__description-text--focus {{ 'November 30, 2023.' }}
          .info__note 
            .info__note-text.rsvp__note-text--focus {{ 'Unconfirmed attendance is considered as not attending.' }}
            .info__note-text {{ ' We thank you for your kind understanding.' }}
      RSVPForm(
        :invitee="invitee"
        :inviteeRSVP="inviteeRSVP"
        @submit="handleSubmit"
      )
</template>

<script lang="ts" setup>
import AModal from '~/components/atoms/AModal.vue'
import useMedia from '~/composables/useMedia'
import type { Invitee, InviteeRSVP } from '~/types/model/wedding/invitee'
import ALoading from '~/components/atoms/ALoading.vue'
import RSVPForm from '~/components/organisms/wedding/RSVPForm.vue'

type Props = {
  isOpen: boolean
  invitee: Invitee
  inviteeRSVP: InviteeRSVP | null
}

const props = defineProps({
  isOpen: {
    type: Boolean as () => Props['isOpen'],
    default: false,
  },
  invitee: {
    type: Object as () => Props['invitee'],
    required: true,
  },
  inviteeRSVP: {
    type: Object as () => Props['inviteeRSVP'],
    default: null,
  },
})

const emit = defineEmits(['submit'])

const { isSP } = useMedia()

const handleSubmit = (inviteeRSVP: InviteeRSVP) => {
  emit('submit', inviteeRSVP)
}
</script>
<script lang="ts">
export default {
  name: 'RSVPModal',
  components: { AModal, ALoading },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

.inner {
  @include pc {
    min-width: 400px;
  }
}

.heading {
  & {
    @include pc {
      margin-bottom: 16px;
    }
    @include sp {
      margin-bottom: 16px;
    }
  }
  &__main {
    @include font($size: $font-xl);
    font-weight: bold;
    margin-bottom: 8px;
  }
}

.info {
  & {
    margin-bottom: 20px;
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
