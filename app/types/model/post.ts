/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseArray, parseNumber, parseString } from '~/types/model/parse'
import { parseTag, Tag } from '~/types/model/tag'

export interface Post {
  title: string
  description: string
  createdAt: number
  tags: Tag[]
}

export const Langs = ['en', 'id', 'ja'] as const
export type Lang = typeof Langs[number]

export interface PostContent {
  lang: Lang
  html: string
}

export interface PostComment {
  author: string
  content: string
}

export const parsePost = (data: any): Post => ({
  title: parseString(data.title),
  description: parseString(data.description),
  createdAt: parseNumber(data.createdAt),
  tags: parseArray(data.tags, parseTag),
})

export const isLang = (lang: any): lang is Lang => Langs.includes(lang as Lang)

export const parseLang = (lang: any): Lang => (isLang(lang) ? lang : 'en')

export const parsePostContent = (data: any): PostContent => ({
  lang: parseLang(data.lang),
  html: parseString(data.html),
})

export const parsePostComment = (data: any): PostComment => ({
  author: parseString(data.author),
  content: parseString(data.content),
})
