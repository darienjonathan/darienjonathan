/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export interface Tag {
  text: string
  bgColor: string
}

export const parseTag = (data: any): Tag => ({
  text: parseString(data.text),
  bgColor: parseString(data.bgColor),
})
