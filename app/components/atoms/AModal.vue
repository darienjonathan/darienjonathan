<template lang="pug">
.a-modal(v-show="isModalOpen")
  transition(
    name="fade"
    @before-enter="handleBeforeEnter"
    @after-leave="handleAfterLeave"
    appear
  )
    .overlay(
      @click="$emit('close')"
      v-show="isOpen"
    )
      .wrapper(
        :style="{ width, height }"
        :data-type="type"
        @click.stop
      )
        slot
        .close__btn(@click="$emit('close')")
          .close__icon.material-icons-outlined close
</template>
<script lang="ts" setup>
interface Props {
  type: 'default' | 'full-size' | 'auto' | 'frameless'
  width: string
  height: string
  isOpen: boolean
}
const props = defineProps({
  type: {
    type: String as () => Props['type'],
    default: 'default',
  },
  width: {
    type: String as () => Props['width'],
    default: '',
  },
  height: {
    type: String as () => Props['height'],
    default: '',
  },
  isOpen: {
    type: Boolean as () => Props['isOpen'],
    default: false,
  },
})

const { isOpen } = toRefs(props)
const isModalOpen = ref(false)
const { defineViewportVariables } = useViewportUnitSizes()

watch(isOpen, boolean => {
  if (boolean) {
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.position = 'fixed'
    defineViewportVariables()
  } else {
    const top = parseInt(document.body.style.top || '0') * -1
    document.body.style.position = ''
    document.body.style.top = ''
    window.scrollTo({
      left: 0,
      top,
      behavior: 'instant',
    })
  }
})

const handleBeforeEnter = () => {
  if (!props.isOpen) return
  isModalOpen.value = true
}

const handleAfterLeave = () => {
  isModalOpen.value = false
}
</script>
<style lang="scss" scoped>
@use 'sass:math';
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
  border-radius: $radius-sm;
  background-color: $black;
  color: $white;
  box-shadow: 0 0 12.5px $black;
  max-height: vh(80);
  max-width: vw(80);
  @include pc {
    padding: 32px;
  }
  @include sp {
    padding: 24px;
  }
  &[data-type='default'] {
    height: auto;
    overflow: auto;
    @include pc {
      width: 768px;
    }
    @include sp {
      width: calc(100% - 20px);
    }
  }
  &[data-type='auto'] {
    @include size('auto', 'auto');
  }
  &[data-type='full-size'] {
    @include size(100%, 100%);
    max-height: initial;
  }
  &[data-type='frameless'] {
    padding: 0;
  }
}

.close {
  $icon-size: 3rem;
  &__btn {
    $btn-el-size: math.div(2, 3) * $icon-size;
    @include size($btn-el-size, $btn-el-size);
    @include pc {
      @include absolute(32px, 32px);
    }
    @include sp {
      @include absolute(24px, 24px);
    }
    @include flex;

    @at-root {
      .wrapper[data-type='frameless'] .close__btn {
        mix-blend-mode: difference;
      }
    }
  }
  &__icon {
    @include font($size: $icon-size, $line-height: 1);
    cursor: pointer;
    transition: filter 0.25s;
    &:hover {
      filter: drop-shadow(0 0 2px $white);
    }
  }
}
</style>
