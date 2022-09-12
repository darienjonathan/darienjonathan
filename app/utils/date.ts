import { LangEnum } from '~/types/lang'
import type { LangEnumType } from '~/types/lang'
import { days, months } from '~/utils/translations/date'

export const formatWithDay = (dateObject: Date, lang: LangEnumType) => {
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth()
  const date = dateObject.getDate()
  const day = dateObject.getDay()
  if (([LangEnum.id, LangEnum.en] as LangEnumType[]).includes(lang)) {
    return `${days[lang][day]}, ${date} ${months[lang][month]} ${year}`
  }
  if (lang === LangEnum.ja) {
    return `${year}年${months[lang][month]}${date}日（${days[lang][day]}）`
  }
}
