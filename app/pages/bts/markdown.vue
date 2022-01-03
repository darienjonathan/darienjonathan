<template lang="pug">
.markdown
  h1.title Markdown
  template(v-if="!signInStatus.notYet")
    template(v-if="signInStatus.signedIn")
      .textarea-to-md
        .textarea-to-md__content
          .section
            label.label textarea
            textarea.content(
              @input="handleTextareaInput"
              :value="textareaVal"
            )
          .line
          .section
            label.label markdown output
            AMarkdown.content(:content="textareaVal")
        .textarea-to-md__form
          .form__label filename
          input.form__input(
            @input="handleFilenameInput"
            @keyup.enter="handleSaveFile"
            :value="filename"
          )
          button.form__save-btn(
            @click="handleSaveFile"
            :disabled="!textareaVal.length === true"
          ) Save
    template(v-else)
      button.signin-btn(@click="handleOpenSignInModal") Sign in to create markdowns
  .section-line
  .storage
    .storage__heading
      h3.storage__title Storage Items
      button.storage__retrieve-btn(@click="handleRetrieveItemList") Retrieve Items
    .storage__items
      .storage__item(
        v-for="item in itemList"
        :key="item.name"
      ) 
        .storage__item-name(@click="handleOutputStorageItem(item.name)") {{ item.name }}
        .storage__item-delete.material-icons-outlined(@click="handleDelete(item.name)") delete
  AModal(
    :is-open="!!selectedItem"
    @close="selectedItem = undefined"
  )
    template(v-if="selectedItem")
      h4.storage__output-title {{ selectedItem.name }}
      AMarkdown.storage__output-html(:content="selectedItem.content")
  MSignInModal(
    :is-open="isSignInModalOpen"
    @close="handleCloseSignInModal"
  )
</template>
<script lang="ts" setup>
import { getDownloadURL } from '@firebase/storage'
import AMarkdown from '~/components/atoms/AMarkdown.vue'
import AModal from '~/components/atoms/AModal.vue'
import MSignInModal from '~/components/molecules/MSignInModal.vue'

interface Item {
  name: string
  url: string
  content: string
}

const { signInStatus } = useAuth()
const isSignInModalOpen = ref(false)
const handleOpenSignInModal = () => {
  isSignInModalOpen.value = true
}
const handleCloseSignInModal = () => {
  isSignInModalOpen.value = false
}
watch(signInStatus, status => {
  if (status.signedIn) isSignInModalOpen.value = false
})

const EXTENSION = '.md'
const { userUid } = useAuth()
const { usePosts } = useStorageItems()
const posts = usePosts()

const textareaVal = ref('')
const handleTextareaInput = (e: Event) => {
  textareaVal.value = (e.target as HTMLTextAreaElement).value
}

const filename = ref('')
const handleFilenameInput = (e: Event) => {
  filename.value = (e.target as HTMLTextAreaElement).value
}

const handleSaveFile = async () => {
  await posts.putString({
    file: textareaVal.value,
    fileName: filename.value.match(new RegExp(EXTENSION + '$'))
      ? filename.value
      : filename.value + EXTENSION,
    customMetadata: posts.authorUidMetadata(userUid.value),
  })
  handleRetrieveItemList()
}

const itemList = ref<Item[]>()
const handleRetrieveItemList = async () => {
  const itemListResult = await posts.list()
  itemList.value = await Promise.all(
    itemListResult.items.map(async item => ({
      name: item.name,
      url: await getDownloadURL(item),
      content: '',
    }))
  )
}
watch(itemList, handleRetrieveItemList, {
  deep: true,
})

onMounted(async () => {
  await nextTick()
  handleRetrieveItemList()
})

const selectedItem = ref<Item>()
const handleOutputStorageItem = (name: string) => {
  selectedItem.value = itemList.value.find(item => item.name === name)
}

watch(
  selectedItem,
  async item => {
    if (!item) return
    if (item.content) return
    const res = await fetch(item.url)
    item.content = await res.text()
  },
  {
    deep: true,
  }
)

const handleDelete = async (name: string) => {
  const itemIndex = itemList.value.findIndex(item => item.name === name)
  if (itemIndex === -1) return
  await posts.deleteItem(name)
  itemList.value = itemList.value.filter((_item, index) => index !== itemIndex)
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/main';

.button {
  @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  margin-left: 16px;
}

.markdown {
  @include size(vw(100), vh(100));
  @include flex($direction: column);
}

.title {
  @include font-family('roboto-slab');
  @include font($size: $font-huge);
  margin-bottom: 32px;
}

.textarea-to-md {
  &__content {
    margin-bottom: 16px;
    @include sp {
      @include flex($direction: column, $align-items: stretch);
    }
    @include pc {
      @include flex($align-items: stretch);
    }
  }
  &__form {
    @include flex;
  }
}

.section {
  @include sp {
    &:first-child {
      margin-bottom: 16px;
    }
    &:last-child {
      margin-top: 16px;
    }
  }
  @include pc {
    &:first-child {
      margin-right: 16px;
    }
    &:last-child {
      margin-left: 16px;
    }
  }
}

.label {
  @include size(fit-content);
  display: block;
  margin-bottom: 8px;
}

.content {
  @include size(300px, 200px);
  padding: 8px;
}

.line {
  @include sp {
    @include line(y, auto, 1px);
  }
  @include pc {
    @include line(x, auto, 1px);
  }
}

.form {
  &__label {
    margin-right: 8px;
  }
  &__save-btn {
    @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
    margin-left: 16px;
  }
}

.signin-btn {
  @include button($bg-color: rgba($navy-dark, 0.5));
}

.section-line {
  @include line(y, 768px, 1px);
  margin: 20px auto;
}
.storage {
  @include pc {
    width: 768px;
  }
  @include sp {
    width: 100%;
    padding: 20px;
  }

  &__heading {
    @include flex($justify: space-between);
    margin-bottom: 20px;
  }

  &__title {
    @include font($size: $font-lg);
  }

  &__retrieve-btn {
    @include button($bg-color: rgba($navy-blue-light, 0.5), $font-size: $font-sm);
  }

  &__items {
    padding-left: 12px;
    border-left: 2px solid white;
  }

  &__item {
    @include flex($justify: space-between);
    &-name {
      cursor: pointer;
      transition: text-decoration 0s;
      &:hover {
        text-decoration: underline;
      }
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
    &-delete {
      cursor: pointer;
      transition: filter 0.25s;
      &:hover {
        filter: drop-shadow(0 0 2px $white);
      }
    }
  }

  &__output {
    padding-top: 24px;
    &-title {
      @include font($size: $font-huge, $color: inherit);
      margin-bottom: 24px;
    }
  }
}
</style>
