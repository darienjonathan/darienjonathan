<template lang="pug">
Default
  template(v-if="signInStatus.signedIn")
    slot
  MSignInModal(:is-open="isSignInModalOpen")
</template>

<script lang="ts" setup>
import Default from '~/layouts/default.vue'
import MSignInModal from '~/components/molecules/MSignInModal.vue'

const { signInStatus } = useAuth()

const isSignInModalOpen = ref(false)
watch(
  signInStatus,
  status => {
    isSignInModalOpen.value = status.signedOut
  },
  {
    immediate: true,
  }
)
</script>
