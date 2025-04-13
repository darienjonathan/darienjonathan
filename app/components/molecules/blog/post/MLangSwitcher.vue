<template lang="pug">
.m-lang-switcher(v-if="!shouldHide && currentLang")
  .lang-tab__label {{ languageSwitcher[currentLang] }}
  template(v-for="({ isActive, val }, key) in langItem")
    .lang-tab__item(
      v-if="!disabledLangs?.includes(val)"
      :data-active="isActive"
      @click="changeActiveLang(key)"
    ) {{ val.toUpperCase() }}
</template>
<script lang="ts" setup>
import { langList } from '~/types/lang'
import type { Lang, LangEnumType } from '~/types/lang'
import { languageSwitcher } from '~/utils/translations/blog'

defineOptions({
  name: 'MLangSwitcher',
})

type LangItem = Lang<{
  val: LangEnumType
  isActive: boolean
  isDisabled: boolean
}>

const props = defineProps<{ disabledLangs?: LangEnumType[] }>()

const emit = defineEmits<{ (e: 'langChange', lang: LangEnumType): void }>()

const langItem: LangItem = reactive({
  id: {
    val: 'id',
    isActive: false,
    isDisabled: false,
  },
  en: {
    val: 'en',
    isActive: false,
    isDisabled: false,
  },
  ja: {
    val: 'ja',
    isActive: false,
    isDisabled: false,
  },
})

const shouldHide = computed(
  () => Object.values(langItem).filter(val => !val.isDisabled).length <= 1,
)

watchEffect(() => {
  let isActiveFound = false
  for (const lang of langList) {
    langItem[lang].isDisabled = props.disabledLangs?.includes(lang) || false
    if (!isActiveFound && !props.disabledLangs?.includes(lang)) {
      langItem[lang].isActive = true
      isActiveFound = true
    }
  }
})

const currentLang = computed<LangEnumType | undefined>(() =>
  langList.find(lang => langItem[lang].isActive),
)
watch(currentLang, lang => {
  if (!lang) return
  emit('langChange', lang)
})

const changeActiveLang = (langKey: LangEnumType) => {
  const langs = Object.keys(langItem) as LangEnumType[]
  langs.forEach((key: LangEnumType) => {
    langItem[key].isActive = key === langKey
  })
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/main';
.m-lang-switcher {
  @include flex($justify: flex-start);
}

.lang-tab {
  &__label {
    font-weight: bold;
    margin-right: 12px;
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
</style>
