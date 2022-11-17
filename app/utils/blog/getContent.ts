import { DEFAULT_LANG, Lang, langList } from '~/types/lang'
import type { LangEnumType } from '~/types/lang'

export const getContent = (content: Partial<Lang>, currentLang: LangEnumType = DEFAULT_LANG) => {
  if (content[currentLang]) return content[currentLang]
  return langList.reduce((currentContent, lang) => {
    const contentForThisLang = content[lang]
    if (currentContent || !contentForThisLang) return currentContent
    return contentForThisLang
  }, '')
}
