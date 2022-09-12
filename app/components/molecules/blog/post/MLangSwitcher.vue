<template lang="pug">
.m-lang-switcher(v-if="!shouldHide")
  .lang-tab__label {{ languageSwitcher[currentLang] }}
  template(v-for="({ isActive, val }, key) in langItem")
    .lang-tab__item(
      v-if="!disabledLangs?.includes(val)"
      :data-active="isActive"
      @click="changeActiveLang(key)"
    ) {{ val.toUpperCase() }}
</template>
<script lang="ts" setup>
import { langList, LangEnum } from '~/types/lang'
import type { Lang, LangEnumType } from '~/types/lang'
import { languageSwitcher } from '~/utils/translations/blog'

type LangItem = Lang<{
  val: LangEnumType
  isActive: boolean
  isDisabled: boolean
}>

const props = defineProps<{ disabledLangs?: LangEnumType[] }>()

const emit = defineEmits<{ (e: 'langChange', lang: LangEnumType) }>()

const langItem: LangItem = reactive(
  Object.keys(LangEnum).reduce(
    (obj, key: keyof Lang) => ({
      ...obj,
      [key]: {
        val: LangEnum[key],
        isActive: false,
        isDisabled: false,
      },
    }),
    {} as LangItem
  )
)

const shouldHide = computed(
  () => Object.values(langItem).filter(val => !val.isDisabled).length <= 1
)

onMounted(() => {
  let isActiveFound = false
  for (const lang of langList) {
    langItem[lang].isDisabled = props.disabledLangs?.includes(lang)
    if (!isActiveFound && !props.disabledLangs?.includes(lang)) {
      langItem[lang].isActive = true
      isActiveFound = true
    }
  }
})

const currentLang = computed<LangEnumType>(() => langList.find(lang => langItem[lang].isActive))
watch(currentLang, lang => {
  emit('langChange', lang)
})

const changeActiveLang = (langKey: keyof Lang) => {
  Object.keys(langItem).forEach((key: keyof Lang) => {
    langItem[key].isActive = key === langKey
  })
}
</script>
<script lang="ts">
export default {
  name: 'MLangSwitcher',
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
