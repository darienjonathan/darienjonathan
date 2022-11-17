<template lang="pug">
.rsvp-form
  MInput.input(:label="'Name'") {{ invitee.name }}
  template(v-if="isReception")
    MInput.input(:label="'Events to attend'")
      select.input__item(
        name="receptionAttendance"
        :value="receptionAttendance"
        @change="handleChangeReceptionAttendance"
      )
        option(:value="''") I'm not attending
        option(:value="'matrimony'") Holy Matrimony
        option(:value="'reception'") Dinner Reception
        option(:value="'matrimony,reception'") Both
  template(v-else-if="isMatrimony")
    MInput.input(:label="'Are you attending?'")
      select.input__item(
        name="matrimonyAttendance"
        :value="childrenNumber"
        @change="handleChangeReceptionAttendance"
      )
        option(
          :value="''"
          :selected="true"
        ) No
        option(:value="'matrimony'") Yes
  template(v-if="isAttending.matrimony || isAttending.reception")
    MInput.input(
      :label="'Phone Number'"
      :error-text="isPhoneNumberError ? 'Please input only numbers' : ''"
      :note-text="'※ do not include the starting number 0'"
    )
      select.input__item.input__item--phone(
        name="phoneNumber"
        :value="phoneCodeNumber"
        @change="handlePhoneCodeChange"
      )
        option(
          v-for="phoneCode in phoneCodeList"
          :value.num="phoneCode.number"
        ) {{ phoneCode.country }}
      .phone-number__break
      .phone-number__number
        .phone-number__code {{ `+${phoneCodeNumber}` }}
        input.phone-number__input(
          type="text"
          @input="handlePhoneNumberChange"
        )
    template(v-if="isAttending.reception")
      MInput.input(
        :label="'Number of Guests'"
        :note-text="'※ over 12 years old, including yourself'"
      )
        select.input__item.input__item--phone(
          name="guestNumber"
          :value="guestNumber"
          @change="handleGuestNumberChange"
        )
          option(
            v-for="number in invitee.maxGuestNumber"
            :value.num="number"
          ) {{ number }}
      MInput.input(
        :label="'Number of Children'"
        :note-text="'※ max. 12 years old'"
      )
        select.input__item.input__item--phone(
          name="guestNumber"
          :value="childrenNumber"
          @change="handleChildrenNumberChange"
        )
          option(
            v-for="number in maxChildrenNumber + 1"
            :value.num="number - 1"
          ) {{ number - 1 }}
  .note(v-if="isAttending.matrimony || isAttending.reception") {{ '※ Your data will only be used for RSVP purposes. The data will be deleted after the events conclude.' }}
  button.button(
    @click="handleSubmit"
    :disabled="!canSubmit"
  ) Submit
</template>
<script lang="ts" setup>
import { phoneCodeList } from '~/utils/phone'
import MInput from '~/components/molecules/wedding/MInput.vue'
import type { Invitee, InvitationType } from '~/types/model/wedding/invitee'
import { getIsMatrimony, getIsReception, getIsNotInvited } from '~/utils/wedding'

type Props = {
  invitee: Invitee
}

const props = defineProps({
  invitee: {
    type: Object as () => Props['invitee'],
    default: undefined,
  },
})

const emit = defineEmits<{ (e: 'submit', invitee: Invitee) }>()

const isReception = computed(() => getIsReception(props.invitee.invitationType))
const isMatrimony = computed(() => getIsMatrimony(props.invitee.invitationType))
const isNotInvited = computed(() => getIsNotInvited(props.invitee.invitationType))

// --------------------------------------------------
// Form
// --------------------------------------------------

const maxChildrenNumber = 1

const isAttending = reactive<Partial<Record<InvitationType, boolean>>>({
  reception: false,
  matrimony: false,
})

const handleChangeIsAttending = (attendance: string) => {
  const eventToAttend = attendance.split(',')
  Object.keys(isAttending).forEach((key: InvitationType) => {
    isAttending[key] = !!eventToAttend.includes(key)
  })
}

const receptionAttendance = ref<string>('')

const handleChangeReceptionAttendance = (e: Event) => {
  const target = e.target as HTMLSelectElement
  receptionAttendance.value = target.value
}

watch(receptionAttendance, handleChangeIsAttending, {
  immediate: true,
})

const phoneCodeNumber = ref<number>(phoneCodeList.find(c => c.isDefault)?.number)
const handlePhoneCodeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  phoneCodeNumber.value = Number(target.value)
}

const phoneNumber = ref<number>()
const isPhoneNumberError = ref(false)
const handlePhoneNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const inputtedPhoneNumber = Number(target.value)
  phoneNumber.value = inputtedPhoneNumber
  isPhoneNumberError.value = isNaN(inputtedPhoneNumber)
}

const guestNumber = ref(1)
const handleGuestNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  guestNumber.value = Number(target.value)
}

const childrenNumber = ref(0)
const handleChildrenNumberChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  childrenNumber.value = Number(target.value)
}

const inviteeToSubmit = computed(() => {
  const attendanceToSubmit = Object.keys(isAttending).filter(
    key => isAttending[key]
  ) as InvitationType[]
  const phoneNumberToSubmit = isNotInvited.value
    ? undefined
    : `+${phoneCodeNumber.value}${phoneNumber.value}`
  const guestNumberToSubmit = isNotInvited.value ? undefined : guestNumber.value
  const childrenNumberToSubmit = isReception.value ? childrenNumber.value : undefined
  return {
    ...props.invitee,
    attendance: attendanceToSubmit,
    phoneNumber: phoneNumberToSubmit,
    guestNumber: guestNumberToSubmit,
    childrenNumber: childrenNumberToSubmit,
  }
})

const canSubmit = computed(() => {
  if (!inviteeToSubmit.value.attendance.length) return true
  const minPhoneNumberLength = 9 // NOTE: 昔の電話番号は10桁で、0抜きで9桁になる
  return !!phoneNumber.value && String(phoneNumber.value).length >= minPhoneNumberLength
})

const handleSubmit = () => {
  emit('submit', inviteeToSubmit.value)
  // TODO: submit
}
</script>
<script lang="ts">
export default {
  name: 'RSVPForm',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.rsvp-form {
  padding: 12px;
  border: 1px solid $white;
  box-shadow: 0 0 5px $white;
}

.input {
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__item {
    @include sp {
      width: 100%;
      &--phone {
        margin-bottom: 4px;
      }
    }
  }
}

.phone-number {
  &__code-select,
  &__number {
    min-width: 0;
  }

  &__code {
    margin-right: 4px;
    @include pc {
      margin-left: 4px;
    }
  }

  &__break {
    flex-basis: 100%;
    @include pc {
      display: none;
    }
  }

  &__number {
    @include flex($justify: flex-start);
  }

  &__input {
    min-width: 0;
    @include pc {
      width: 120px;
    }
  }
}

.note {
  @include font($size: $font-xs);
  margin-top: 8px;
}

.button {
  @include button($bg-color: rgba($white, 0.15), $font-size: $font-sm);
  display: block;
  margin: 12px auto 0;
}
</style>
