<template lang="pug">
.a-modal(v-show="isModalOpen")
  transition(
    name="fade"
    @before-enter="isModalOpen = true"
    @after-leave="isModalOpen = false"
    appear
  )
    .overlay(
      @click="$emit('close')"
      v-show="isOpen"
    )
      .wrapper(
        :data-size="size"
        @click.stop
      )
        slot
        .close-btn(@click="$emit('close')")
          .material-icons-outlined close
</template>
<script lang="ts" setup>
interface Props {
  size: 'default' | 'full-size'
  isOpen: boolean
}
const props = defineProps({
  size: {
    type: String as () => Props['size'],
    default: 'default',
  },
  isOpen: {
    type: Boolean as () => Props['isOpen'],
    default: false,
  },
})

const { isOpen } = toRefs(props)
const isModalOpen = ref(false)

watch(isOpen, boolean => {
  if (boolean) {
    document.body.style.position = 'fixed'
    document.body.style.top = `-${window.scrollY}px`
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo(0, parseInt(document.body.style.top || '0') * -1)
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/main';

.a-modal {
  @include size(vw(100), vh(100));
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
}

.overlay {
  @include size(100%, 100%);
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($white, 0.25);
}

.wrapper {
  @include absolute-center;
  padding: 32px;
  border-radius: $radius-sm;
  background-color: $black;
  color: $white;
  &[data-size='default'] {
    height: vh(80);
    @include sp {
      width: calc(100% - 20px);
    }
    @include non-sp {
      width: 768px;
    }
  }
  &[data-size='full-size'] {
    @include size(100%, 100%);
  }
}

.close-btn {
  @include absolute(32px, 32px);
  @include flex;
}

.material-icons-outlined {
  @include font($size: 3rem);
  cursor: pointer;
}
</style>
