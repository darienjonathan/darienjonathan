<template lang="pug">
.wishes
  .heading__wrapper
    .heading {{ 'GREETINGS & WISHES' }}
  .content
    .content__form.form
      input.form__name(
        type="text"
        placeholder="Name"
        :value="currentWish?.name || existingWish?.name"
        @input="handleInputName"
      )
      textarea.form__textarea(
        placeholder="Your greetings & wishes for the couple"
        :value="currentWish?.content || existingWish?.content"
        @input="handleInputContent"
      )
      button.form__submit(
        :disabled="!canSubmit"
        @click="handleSubmit"
      ) {{ submitButtonText }}
    .content__item.item(:data-empty="!wishes.length")
      template(v-if="wishes.length")
        template(v-for="{ name, timestamp, content } in wishes")
          .item__wrapper
            .item__name {{ name }}
            .item__date {{ formatWithDay(new Date(timestamp), LangEnum.en) }}
            .item__content {{ content }}
      template(v-else)
        .item__empty-text {{ 'Be the first to greet the couple!' }}
</template>
<script lang="ts" setup>
import type { Unsubscribe } from 'firebase/firestore'
import { LangEnum } from '~/types/lang'
import useUid from '~/composables/wedding/useUid'
import type { Wish } from '~/types/model/wedding/wish'
import { formatWithDay } from '~/utils/date'

const WISH_UID_LOCALSTORAGE_KEY = 'wish_uid'

const { uid } = useUid()
const { useWishes } = useFirestoreCollections()
const wishesFirestore = useWishes()

const existingWish = ref<Wish>()
const currentWish = ref<Wish>({
  name: '',
  timestamp: 0,
  content: '',
})

const isUpdate = computed(() => wishUid.value !== undefined && existingWish.value !== undefined)

// Existing wish's identifier
const wishUid = ref<string>()
const updateWishUid = () => {
  wishUid.value = localStorage.getItem(WISH_UID_LOCALSTORAGE_KEY) || uid.value || undefined
}
onMounted(updateWishUid)

// Subscribe to Wishes
const wishes = ref<Wish[]>([])
const unsubscribeWishes = ref<Unsubscribe>()
onMounted(() => {
  wishesFirestore.subscribeCollection(wishMap => {
    if (!wishMap) return
    wishes.value = Array.from(wishMap.values())

    if (wishUid.value) {
      existingWish.value = wishMap.get(wishUid.value)
    }
  })
})
onUnmounted(() => {
  if (!unsubscribeWishes.value) return
  unsubscribeWishes.value()
})

// Submit
const canSubmit = computed(() => {
  const keys: (keyof Wish)[] = ['name', 'content']
  const hasChange = keys.some(key => existingWish.value?.[key] !== currentWish.value[key])
  const isInputComplete = keys.every(key => !!currentWish.value[key])

  return hasChange && isInputComplete
})

const submitButtonText = computed(() => (isUpdate.value ? 'Update' : 'Submit'))

// Event Handler
const handleInputName = (e: Event) => {
  const name = (e.target as HTMLInputElement).value
  currentWish.value.name = name
}

const handleInputContent = (e: Event) => {
  const content = (e.target as HTMLTextAreaElement).value
  currentWish.value.content = content
}

const handleSubmit = () => {
  if (!canSubmit.value) return
  currentWish.value.timestamp = Date.now()

  const uid = wishUid.value && isUpdate.value ? wishUid.value : wishesFirestore.getNewId()
  wishesFirestore.set(uid, currentWish.value).then(() => {
    existingWish.value = currentWish.value
    localStorage.setItem(WISH_UID_LOCALSTORAGE_KEY, uid)
    updateWishUid()
  })
}
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Wishes',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.wishes {
  margin: 0 auto;
  @include pc {
    max-width: 1200px;
  }
}

.heading {
  &__wrapper {
    margin-bottom: 60px;
  }

  & {
    @include font-family('marcellus');
    text-align: center;
    margin-bottom: 20px;
    @include pc {
      @include font($size: $font-xhuge);
    }
    @include sp {
      @include font($size: $font-huge);
    }
  }
}

.content {
  display: grid;
  gap: 40px;
  @include pc {
    grid-template-columns: 2fr 3fr;
    height: 300px;
  }
}

.form {
  & {
    @include flex($direction: column, $justify: flex-start, $align-items: flex-start);
    @include sp {
      height: 300px;
    }
  }

  &__name,
  &__textarea,
  &__submit {
    display: block;
    width: 100%;
  }

  &__name,
  &__textarea {
    @include font-family('cabin');
    @include font($size: $font-sm, $color: $black);
    margin-bottom: 12px;
    padding: 6px;
  }

  &__textarea {
    height: 100%;
  }

  &__submit {
    @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  }
}

.item {
  & {
    overflow: auto;
    @include pc {
      padding-right: 20px;
    }
    @include sp {
      height: 300px;
      padding-right: 8px;
      &[data-empty='true'] {
        height: auto;
      }
    }
  }

  &__wrapper {
    display: grid;
    grid-template-areas:
      'name date'
      'content content';
    grid-template-columns: auto 1fr;
    align-items: baseline;
    column-gap: 20px;
    row-gap: 4px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__name {
    grid-area: name;
  }

  &__date {
    @include font($size: $font-xs);
    grid-area: date;
  }

  &__content {
    @include font($size: $font-sm);
    grid-area: content;
    word-break: break-all;
  }

  &__empty-text {
    @include font-family('marcellus');
  }
}
</style>
