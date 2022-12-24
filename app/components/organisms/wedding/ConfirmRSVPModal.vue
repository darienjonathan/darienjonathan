<template lang="pug">
AModal.confirm-rsvp-modal(
  :is-open="props.isOpen"
  :width="isSP ? 'calc(100% - 40px)' : 'auto'"
  @close="$emit('close')"
)
  .inner
    .heading
      h2.heading__main Confirm Reservation
      h3.heading__sub Reserve with below details?
    .content
      .content__item
        .content__label Name
        .content__value {{ invitee.name }}
      .content__item
        .content__label Events to attend
        .content__value {{ attendanceValueText }}
      template(v-if="isReception || isMatrimony")
        .content__item
          .content__label Phone number
          .content__value {{ invitee.phoneNumber }}
      template(v-if="isReception")
        .content__item
          .content__label {{ guestNumberLabelText }}
          .content__value {{ invitee.guestNumber }}
        .content__item
          .content__label Number of guests (children)
          .content__value {{ invitee.childrenNumber }}
    button.submit-btn(
      @click="handleConfirmRSVP"
      :disabled="isRequesting"
    )
      template(v-if="!isRequesting")
        template(v-if="!isRequestCompleted || hasError")
          | Confirm
        template(v-else)
          | Close
      template(v-else)
        ALoading.loading(
          :width="'20px'"
          :height="'20px'"
        )
    template(v-if="isRequestCompleted")
      template(v-if="hasError")
        .notice.notice--error {{ 'There is an error in confirming your reservation. Please refresh your browser and try once again. Sorry for the inconvenience.' }}
      template(v-else)
        .notice {{ 'Your reservation has been successfully recorded. Thankyou for confirming your reservation.' }}
</template>

<script lang="ts" setup>
import AModal from '~/components/atoms/AModal.vue'
import useMedia from '~/composables/useMedia'
import type { Invitee } from '~/types/model/wedding/invitee'
import ALoading from '~/components/atoms/ALoading.vue'

const { isSP } = useMedia()

type Props = {
  isOpen: boolean
  invitee: Partial<Invitee>
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
})

const emit = defineEmits(['close'])

const isReception = computed(() => props.invitee.attendance?.includes('reception'))
const isMatrimony = computed(() => props.invitee.attendance?.includes('matrimony'))

const attendanceValueText = computed(() => {
  if (isReception.value && isMatrimony.value) return 'Holy Matrimony & Dinner Reception'
  if (isReception.value) return 'Dinner Reception'
  if (isMatrimony.value) return 'Holy Matrimony & Dinner Reception'
  return 'None'
})

const guestNumberLabelText = computed(() => {
  if (isReception.value) return 'Number of guests (adult)'
  return 'Number of guests'
})

const isRequesting = ref(false)
const isRequestCompleted = ref(false)
const hasError = ref(false)

const shouldCloseModal = computed(() => isRequestCompleted.value && !hasError.value)

const request = (isError: boolean, time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(isError ? reject : resolve, time)
  })

const handleConfirmRSVP = () => {
  if (shouldCloseModal.value) {
    emit('close')
    return
  }

  isRequesting.value = true
  // TODO: confirm RSVP
  request(true, 3000)
    .catch(() => {
      hasError.value = true
    })
    .finally(() => {
      isRequesting.value = false
      isRequestCompleted.value = true
    })
}
</script>
<script lang="ts">
export default {
  name: 'ConfirmRSVPModal',
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
    margin-bottom: 32px;
  }
  &__main {
    @include font($size: $font-xl);
    margin-bottom: 8px;
  }
  &__sub {
    @include font($size: $font-m);
    font-weight: normal;
  }
}

.content {
  & {
    margin-bottom: 32px;
  }
  &__item {
    margin-bottom: 8px;
    @include pc {
      display: grid;
      grid-template-columns: 140px 1fr;
    }
  }
  &__label {
    font-weight: bold;
    @include sp {
      margin-bottom: 4px;
    }
  }
}

.submit-btn {
  @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  width: 100%;
  height: 40px;
}

.notice {
  & {
    @include font($size: $font-sm);
    padding-top: 16px;
  }
  &--error {
    @include font($size: $font-sm, $color: $red-light);
  }
}
</style>
