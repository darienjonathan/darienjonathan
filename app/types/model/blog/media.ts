/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'

export type MediaType = 'image' | 'video'

export type Media = {
  fileLocation: string
  type: MediaType
  caption: string
  fileName: string
}

const isMediaType = (mediaType: any): mediaType is MediaType => {
  return mediaType === 'image' || mediaType === 'video'
}

export const parseMediaType = (mediaType: any): MediaType => {
  if (!isMediaType(mediaType)) return 'image' as MediaType
  return mediaType
}

export const parseMedia = (data: any): Media => ({
  fileLocation: parseString(data.fileLocation),
  type: parseMediaType(data.type),
  caption: parseString(data.caption),
  fileName: parseString(data.fileName),
})
