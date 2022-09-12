/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ASelect } from '~/types/components'
import { parseArray, parseString, parseNumber } from '~/types/model/parse'

export interface Question extends Omit<ASelect, 'isDisabled'> {
  correctAnswerIndex: number
  order: number
  stage: number
}

export const parseQuestion = (data: any): Question => ({
  label: parseString(data.label),
  items: parseArray(data.items, parseString),
  correctAnswerIndex: parseNumber(data.correctAnswerIndex),
  order: parseNumber(data.order),
  stage: parseNumber(data.stage),
})
