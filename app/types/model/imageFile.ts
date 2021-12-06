/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export interface Media {
  url: string
  caption: string
}

export const parseMedia = (data: any): Media => ({
  url: parseString(data.url),
  caption: parseString(data.caption),
})
