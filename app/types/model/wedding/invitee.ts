/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString, parseNumber, parseArray } from '~/types/model/parse'

export type InvitationType = 'reception' | 'matrimony'
export const parseInvitationType = (invitationType: any): InvitationType => {
  const stringifiedType = parseString(invitationType)
  if (stringifiedType === 'reception') return 'reception'
  return 'matrimony'
}

export interface Invitee {
  name: string
  invitationType: InvitationType
  attendance: InvitationType[]
  phoneNumber: string
  maxGuestNumber: number
  guestNumber: number
  childrenNumber: number
}

export const parseInvitee = (data: any): Invitee => ({
  name: parseString(data.name),
  invitationType: parseInvitationType(data.invitationType),
  attendance: parseArray(data.attendance, parseInvitationType),
  phoneNumber: parseString(data.phoneNumber),
  maxGuestNumber: parseNumber(data.maxGuestNumber),
  guestNumber: parseNumber(data.guestNumber),
  childrenNumber: parseNumber(data.childrenNumber),
})
