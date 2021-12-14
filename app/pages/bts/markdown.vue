<template lang="pug">
.markdown
  h1.title Markdown
  .textarea-to-md
    .textarea-to-md__content
      .section
        label.label textarea
        textarea.content(
          ref="textareaRef"
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
        :value="filename"
      )
      button.form__save-btn(@click="handleSaveFile") Save
  .section-line
  .storage
    .storage__heading
      h3.storage__title Storage Items
      button.storage__retrieve-btn(@click="handleRetrieveItemList") Retrieve Items
    .storage__items
      .storage__item(
        v-for="item in itemList"
        :key="item.name"
        @click="handleOutputStorageItem(item.name)"
      ) {{ item.name }}
  AModal(
    :is-open="!!selectedItem"
    @close="selectedItem = undefined"
  )
    h4.storage__output-title Selected File Content
    AMarkdown.storage__output-html(:content="selectedItem?.content")
</template>
<script lang="ts" setup>
import { getDownloadURL } from '@firebase/storage'
import AMarkdown from '~/components/atoms/AMarkdown.vue'
import AModal from '~/components/atoms/AModal.vue'

interface Item {
  name: string
  url: string
  content: string
}

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
}

const textareaRef = ref<HTMLTextAreaElement>(null)
onMounted(() => {
  textareaRef.value.value = ''
})

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
onMounted(async () => {
  await nextTick()
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
  background-color: $navy-dark;
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
    @include non-sp {
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
  @include non-sp {
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
  @include non-sp {
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

.section-line {
  @include line(y, 768px, 1px);
  margin: 20px auto;
}
.storage {
  @include non-sp {
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
    cursor: pointer;
    transition: text-decoration 0s;
    &:hover {
      text-decoration: underline;
    }
    &:not(:last-child) {
      margin-bottom: 8px;
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
