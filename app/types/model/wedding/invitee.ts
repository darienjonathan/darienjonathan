/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString, parseNumber, parseBoolean } from '~/types/model/parse'

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
  adultGuestNumber: number
  childrenGuestNumber: number
}

export const parseInvitee = (data: any): Invitee => ({
  name: parseString(data.name),
  invitationType: parseInvitationType(data.invitationType),
  databasePhoneNumber: parseString(data.databasePhoneNumber),
  adultGuestNumber: parseNumber(data.adultGuestNumber),
  childrenGuestNumber: parseNumber(data.childrenGuestNumber),
})

export interface InviteeRSVP {
  isAttendingReception: boolean
  phoneNumber: string
  adultGuestNumber: number
  childrenGuestNumber: number
}

export const parseInviteeRSVP = (data: any): InviteeRSVP => ({
  isAttendingReception: parseBoolean(data.isAttendingReception),
  phoneNumber: parseString(data.phoneNumber),
  adultGuestNumber: parseNumber(data.adultGuestNumber),
  childrenGuestNumber: parseNumber(data.childrenGuestNumber),
})
