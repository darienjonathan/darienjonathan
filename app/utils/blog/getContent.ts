import { Lang, langList } from '~/types/lang'
import type { LangEnumType } from '~/types/lang'

export const getContent = (content: Partial<Lang>, currentLang: LangEnumType) => {
  if (content[currentLang]) return content[currentLang]
  return langList.reduce((currentContent, lang) => {
    if (currentContent) return currentContent
    if (content[lang]) return content[lang]
    return currentContent
  }, '')
}
