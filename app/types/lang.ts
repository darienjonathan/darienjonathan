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

export const DEFAULT_LANG = LangEnum.en

export type LangEnumType = (typeof LangEnum)[keyof typeof LangEnum]

export const langList: LangEnumType[] = [LangEnum.id, LangEnum.en, LangEnum.ja]
