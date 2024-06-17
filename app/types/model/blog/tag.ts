/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export type Tag = {
  text: string
  bgColor: string
}

export const parseTag = (data: any): Tag => ({
  text: parseString(data.text),
  bgColor: parseString(data.bgColor),
})
