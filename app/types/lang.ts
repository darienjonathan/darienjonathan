export type Lang<T = string> = {
  id: T
  en: T
  ja: T
}

export const LangEnum = <const>{
  id: 'id',
  en: 'en',
  ja: 'ja',
}

export const DEFAULT_LANG = LangEnum.id

export const langList = [LangEnum.id, LangEnum.en, LangEnum.ja]

export type LangEnumType = typeof LangEnum[keyof typeof LangEnum]
