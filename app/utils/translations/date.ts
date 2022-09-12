import { LangEnum } from '~/types/lang'
import type { Lang } from '~/types/lang'

export const days: Lang<string[]> = {
  [LangEnum.en]: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  [LangEnum.id]: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  [LangEnum.ja]: ['日', '月', '火', '水', '木', '金', '土'],
}

export const months: Lang<string[]> = {
  [LangEnum.en]: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  [LangEnum.id]: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  [LangEnum.ja]: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
}
