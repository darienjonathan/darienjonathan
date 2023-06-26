/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString, parseNumber, parseArray } from '~/types/model/parse'

// Invitees that is invited to reception is considered to be invited to matrimony as well
export type InvitationType = 'reception' | 'matrimony'

export const parseInvitationType = (invitationType: any): InvitationType => {
  const stringifiedType = parseString(invitationType)
  if (stringifiedType === 'reception') return 'reception'
  return 'matrimony'
}

export interface Invitee {
  name: string
  invitationType: InvitationType
  databasePhoneNumber: string
  invitedGuestNumber: number
}

export const parseInvitee = (data: any): Invitee => ({
  name: parseString(data.name),
  invitationType: parseInvitationType(data.invitationType),
  databasePhoneNumber: parseString(data.databasePhoneNumber),
  invitedGuestNumber: parseNumber(data.invitedGuestNumber),
})

export interface InviteeRSVP {
  attendance: InvitationType[]
  phoneNumber: string
  guestNumber: number
  childrenNumber: number
}

export const parseInviteeRSVP = (data: any): InviteeRSVP => ({
  attendance: parseArray(data.attendance, parseInvitationType),
  phoneNumber: parseString(data.phoneNumber),
  guestNumber: parseNumber(data.guestNumber),
  childrenNumber: parseNumber(data.childrenNumber),
})
