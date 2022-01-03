<template lang="pug">
Default
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
</style>
