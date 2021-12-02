/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export interface Image {
  url: string
  caption: string
}

export const parseImage = (data: any): Image => ({
  url: parseString(data.url),
  caption: parseString(data.caption),
})
