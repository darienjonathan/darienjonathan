<template lang="pug">
.new
  h3.title {{ 'New Post' }}
  .form
    .form__item
      .form__label Slug
      input.form__input(
        @input="handleSlugInput"
        :value="slug"
      )
  hr.line
  .lang-tab__wrapper
    .lang-tab__label Lang
    .lang-tab__item(
      v-for="({ isActive, val }, key) in langItem"
      :data-active="isActive"
      @click="changeLangItemActiveTab(key)"
    ) {{ val }}
  .form
    .form__item
      .form__label Title
      input.form__input(
        @input="handleTitleInput"
        :value="currentTitle"
      )
    .form__item
      .form__label Description
      textarea.form__input(
        @input="handleDescriptionInput"
        :value="currentDescription"
      )
    .form-md__item
      .form-md__heading
        .form-md__label Content
        .form-md__preview(
          @click="isPreviewOpen = true"
          :data-disabled="!currentContent?.length"
        ) Preview
      textarea.form-md__input(
        @input="handleContentInput"
        :value="currentContent"
        rows="20"
      )
  AModal(
    :is-open="isPreviewOpen"
    @close="isPreviewOpen = false"
  )
    h4.preview__title Preview
    AMarkdown.preview__html(:content="currentContent")
</template>
<script lang="ts" setup>
import { LangEnum } from '~/types/lang'
import type { Lang, LangEnumType } from '~/types/lang'
import AModal from '~/components/atoms/AModal.vue'
import AMarkdown from '~/components/atoms/AMarkdown.vue'

type LangItem = Lang<{
  val: LangEnumType
  isActive: boolean
}>

// スラグ

const slug = ref<string>('')
const handleSlugInput = (e: Event) => {
  slug.value = (e.target as HTMLInputElement).value
}

// 言語切り替え

const langItem: LangItem = reactive(
  Object.keys(LangEnum).reduce(
    (obj, key: keyof Lang) => ({
      ...obj,
      [key]: {
        val: LangEnum[key],
        isActive: false,
      },
    }),
    {} as LangItem
  )
)

const currentLangKey = computed(() =>
  (Object.keys(langItem) as (keyof Lang)[]).find(key => langItem[key].isActive)
)

const changeLangItemActiveTab = (langKey: keyof Lang) => {
  Object.keys(langItem).forEach((key: keyof Lang) => {
    langItem[key].isActive = key === langKey
  })
}

onMounted(() => (langItem.id.isActive = true))

// タイトル

const title = reactive<Lang<string>>({
  en: '',
  id: '',
  ja: '',
})
const currentTitle = computed(() => title[currentLangKey.value])

const handleTitleInput = (e: Event) => {
  title[currentLangKey.value] = (e.target as HTMLInputElement).value
}

// デスクリプション

const description = reactive<Lang<string>>({
  en: '',
  id: '',
  ja: '',
})
const currentDescription = computed(() => description[currentLangKey.value])

const handleDescriptionInput = (e: Event) => {
  description[currentLangKey.value] = (e.target as HTMLTextAreaElement).value
}

// コンテンツ

const content = reactive<Lang<string>>({
  en: '',
  id: '',
  ja: '',
})
const currentContent = computed(() => content[currentLangKey.value])

const handleContentInput = (e: Event) => {
  content[currentLangKey.value] = (e.target as HTMLInputElement).value
}

const isPreviewOpen = ref(false)
</script>
<script lang="ts">
export default {
  name: 'PostsNewPage',
  layout: 'blog-admin',
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';

.new {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.form {
  &__item {
    margin-bottom: 16px;
    @include pc {
      @include flex($justify: flex-start);
    }
  }

  &__label {
    @include pc {
      width: 100px;
    }
    @include sp {
      margin-bottom: 8px;
    }
  }

  &__input {
    width: 200px;
  }
}

.form-md {
  &__item {
    margin-bottom: 16px;
  }

  &__heading {
    @include flex($justify: flex-start);
    margin-bottom: 8px;
  }

  &__label {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid $white;
  }

  &__preview {
    cursor: pointer;
    text-decoration: underline;
    @include font($color: $navy-blue-light);
    &[data-disabled='true'] {
      cursor: auto;
      pointer-events: none;
      @include font($color: $gray);
    }
  }

  &__input {
    width: 75%;
    @include sp {
      width: 100%;
    }
  }
}

.line {
  margin: 24px 0;
}

.lang-tab {
  &__wrapper {
    @include flex($justify: flex-start);
    margin-bottom: 24px;
  }

  &__label {
    font-weight: bold;
    margin-right: 24px;
    margin-bottom: 3px;
  }

  &__item {
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 20px;
    }
    &[data-active='false'] {
      margin-bottom: 3px;
    }
    &[data-active='true'] {
      padding-bottom: 2px;
      border-bottom: 1px solid $white;
    }
  }
}

.preview {
  &__title {
    @include font($size: $font-huge, $color: inherit);
    margin-bottom: 24px;
  }
}
</style>
