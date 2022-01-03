/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseArray, parseNumber, parseString } from '~/types/model/parse'

export interface Lang {
  en: string
  id: string
  ja: string
}

export const parseLang = (data: any): Lang => ({
  en: parseString(data.en),
  id: parseString(data.id),
  ja: parseString(data.ja),
})

export interface Post {
  authorUid: string
  slug: string
  title: Partial<Lang>
  description: string
  createdAt: number
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
  description: parseString(data.description),
  createdAt: parseNumber(data.createdAt),
  tagUids: parseArray(data.tagUids, parseString),
  contentURL: parseLang(data.contentURL),
})

export const parsePostComment = (data: any): PostComment => ({
  author: parseString(data.author),
  content: parseString(data.content),
})
