/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Lang } from '~/types/lang'
import { parseArray, parseNumber, parseString, parseBoolean } from '~/types/model/parse'

export const parseLang = (data: any): Lang => ({
  en: parseString(data.en),
  id: parseString(data.id),
  ja: parseString(data.ja),
})

export type Post = {
  authorUid: string
  slug: string
  title: Partial<Lang>
  description: Partial<Lang>
  createdAt: number
  updatedAt: number
  tagUids: string[]
  contentURL: Partial<Lang>
  isDraft: boolean
}

export type PostComment = {
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
  isDraft: parseBoolean(data.isDraft),
})

export const parsePostComment = (data: any): PostComment => ({
  author: parseString(data.author),
  content: parseString(data.content),
})
