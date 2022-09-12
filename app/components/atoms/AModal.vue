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
        :data-size="size"
        @click.stop
      )
        slot
        .close__btn(@click="$emit('close')")
          .close__icon.material-icons-outlined close
</template>
<script lang="ts" setup>
interface Props {
  size: 'default' | 'full-size' | 'auto'
  width: string
  height: string
  isOpen: boolean
}
const props = defineProps({
  size: {
    type: String as () => Props['size'],
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
  @include pc {
    padding: 32px;
  }
  @include sp {
    padding: 24px;
  }
  &[data-size='default'] {
    height: auto;
    overflow: auto;
    @include pc {
      width: 768px;
    }
    @include sp {
      width: calc(100% - 20px);
    }
  }
  &[data-size='auto'] {
    @include size('auto', 'auto');
  }
  &[data-size='full-size'] {
    @include size(100%, 100%);
    max-height: initial;
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
