import { DEFAULT_LANG, langList } from '~/types/lang'
import type { LangEnumType, Lang } from '~/types/lang'

export const getContent = (content: Partial<Lang>, currentLang: LangEnumType = DEFAULT_LANG) => {
  if (content[currentLang]) return content[currentLang]
  return langList.reduce((currentContent, lang) => {
    const contentForThisLang = content[lang]
    if (currentContent || !contentForThisLang) return currentContent
    return contentForThisLang
  }, '')
}
