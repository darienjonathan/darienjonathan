<template lang="pug">
Default
  template(v-if="signInStatus.signedIn")
    MHeader
    slot
  MSignInModal(
    :is-open="isSignInModalOpen"
    @close="router.push('/')"
  )
</template>

<script lang="ts" setup>
import Default from '~/layouts/default.vue'
import MSignInModal from '~/components/molecules/MSignInModal.vue'
import MHeader from '~/components/molecules/admin/MHeader.vue'

const router = useRouter()
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
