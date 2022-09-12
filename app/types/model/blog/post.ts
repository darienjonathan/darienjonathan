/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lang } from '~/types/lang'
import { parseArray, parseNumber, parseString } from '~/types/model/parse'

export const parseLang = (data: any): Lang => ({
  en: parseString(data.en),
  id: parseString(data.id),
  ja: parseString(data.ja),
})

export interface Post {
  authorUid: string
  slug: string
  title: Partial<Lang>
  description: Partial<Lang>
  createdAt: number
  updatedAt: number
  tagUids: string[]
  contentURL: Partial<Lang>
}

export interface PostComment {
  author: string
  content: string
}

export const parsePost = (data: any): Post => ({
  authorUid: parseString(data.authorUid),
  slug: parseString(data.slug),
  title: parseLang(data.title),
  description: parseLang(data.description),
  createdAt: parseNumber(data.createdAt),
  updatedAt: parseNumber(data.updatedAt),
  tagUids: parseArray(data.tagUids, parseString),
  contentURL: parseLang(data.contentURL),
})

export const parsePostComment = (data: any): PostComment => ({
  author: parseString(data.author),
  content: parseString(data.content),
})
