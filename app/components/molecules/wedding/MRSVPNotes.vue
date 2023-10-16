<template lang="pug">
template(v-if="inviteeRSVP")
  .info
    span.info__description-text {{ 'You can review and update your RSVP details using below form through ' }}
    span.info__description-text.info__description-text--focus {{ `${deadlineString}.` }}
template(v-else)
  .info
    .info__description
      span.info__description-text {{ 'Due to limited space, and to ensure the smooth running of the events, We kindly ask your cooperation by confirming your attendance to the dinner reception before ' }}
      span.info__description-text.info__description-text--focus {{ `${deadlineString}.` }}
    .info__note 
      .info__note-text.info__note-text--focus {{ 'Unconfirmed attendance is considered as not attending.' }}
      .info__note-text {{ ' We thank you for your kind understanding.' }}
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { InviteeRSVP } from '~/types/model/wedding/invitee'

type Props = {
  inviteeRSVP: InviteeRSVP | null
}

defineProps({
  inviteeRSVP: {
    type: Object as () => Props['inviteeRSVP'],
    default: null,
  },
})

const config = useRuntimeConfig().public.wedding

const deadlineString = computed(() => dayjs.unix(config.rsvpDeadline).format('MMMM D, YYYY'))
</script>
<script lang="ts">
export default {
  name: 'MRSVPNotes',
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

.info {
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
