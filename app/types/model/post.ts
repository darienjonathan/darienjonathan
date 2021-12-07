/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseArray, parseNumber, parseString } from '~/types/model/parse'

export interface Post {
  authorUid: string
  slug: string
  title: string
  description: string
  createdAt: number
  tagUids: string[]
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
  authorUid: parseString(data.authorUid),
  slug: parseString(data.slug),
  title: parseString(data.title),
  description: parseString(data.description),
  createdAt: parseNumber(data.createdAt),
  tagUids: parseArray(data.tagUids, parseString),
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
