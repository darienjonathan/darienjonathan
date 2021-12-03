/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export interface ImageFile {
  url: string
  caption: string
}

export const parseImageFile = (data: any): ImageFile => ({
  url: parseString(data.url),
  caption: parseString(data.caption),
})
