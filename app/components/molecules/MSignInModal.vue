<template lang="pug">
AModal(
  :is-open="props.isOpen"
  :width="isSP ? '100%' : '400px'"
  @close="$emit('close')"
)
  h2.header SIGN IN
  .form
    .input
      .input__label email
      input.input__element(
        type="text"
        @input="handleEmailChange"
      )
    .input
      .input__label password
      input.input__element(
        type="password"
        @input="handlePasswordChange"
      )
  button.submit-btn(
    @click="handleSignIn"
    :disabled="!email.length || !password.length"
  ) Sign In
  .error(v-if="!!firebaseError")
    | Invalid email/password
</template>

<script lang="ts" setup>
import { FirebaseError } from '@firebase/util'
import AModal from '~/components/atoms/AModal.vue'
import useMedia from '~/composables/useMedia'

const { isSP } = useMedia()

const { signIn } = useAuth()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const firebaseError = ref<FirebaseError>()
const email = ref<string>('')
const handleEmailChange = (e: Event) => {
  email.value = (e.target as HTMLInputElement).value
}
const password = ref<string>('')
const handlePasswordChange = (e: Event) => {
  password.value = (e.target as HTMLInputElement).value
}
const handleSignIn = () => {
  signIn(email.value, password.value)
    .then(() => {
      firebaseError.value = undefined
    })
    .catch((e: FirebaseError) => {
      firebaseError.value = e
    })
}

const enterListener = (e: Event) => {
  if ((e as KeyboardEvent).code !== 'Enter') return
  if (!email.value.length || !password.value.length) return
  handleSignIn()
}

watch(
  () => props.isOpen,
  isOpen => {
    if (isOpen) {
      document.addEventListener('keypress', enterListener)
    } else {
      document.removeEventListener('keypress', enterListener)
    }
  }
)
</script>
<script lang="ts">
export default {
  name: 'MSignInModal',
  components: { AModal },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

.header {
  margin-bottom: 24px;
}

.form {
  margin-bottom: 24px;
}

.input {
  @include pc {
    @include flex($justify: space-between);
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__label,
  &__element {
    @include sp {
      margin-bottom: 8px;
    }
  }
}

.submit-btn {
  @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  width: 100%;
}

.error {
  @include font($color: $red-light);
  padding-top: 16px;
}
</style>
