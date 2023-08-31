/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString, parseNumber, parseBoolean } from '~/types/model/parse'

// Invitees that is invited to reception is considered to be invited to matrimony as well
export type InvitationType = 'reception' | 'matrimony'
export const parseInvitationType = (invitationType: any): InvitationType | undefined => {
  const stringifiedType = parseString(invitationType)
  if (stringifiedType === 'reception') return 'reception'
  if (stringifiedType === 'matrimony') return 'matrimony'
  return undefined
}

export type InviteeSuffix = 'partner' | 'family'
export const parseInviteeSuffix = (inviteeSuffix: any): InviteeSuffix | undefined => {
  const stringifiedSuffix = parseString(inviteeSuffix)
  if (stringifiedSuffix === 'partner') return 'partner'
  if (stringifiedSuffix === 'family') return 'family'
  return undefined
}

export interface Invitee {
  databaseName: string
  invitationType?: InvitationType
  inviteeSuffix?: InviteeSuffix
  databasePhoneNumber: string
  adultGuestNumber: number
  childrenGuestNumber: number
}

export const parseInvitee = (data: any): Invitee => ({
  databaseName: parseString(data.name),
  invitationType: parseInvitationType(data.invitationType),
  inviteeSuffix: parseInviteeSuffix(data.inviteeSuffix),
  databasePhoneNumber: parseString(data.databasePhoneNumber),
  adultGuestNumber: parseNumber(data.adultGuestNumber),
  childrenGuestNumber: parseNumber(data.childrenGuestNumber),
})

export interface InviteeRSVP {
  name: string
  isAttendingReception: boolean
  phoneNumber: string
  adultGuestNumber: number
  childrenGuestNumber: number
}

export const parseInviteeRSVP = (data: any): InviteeRSVP => ({
  name: parseString(data.name),
  isAttendingReception: parseBoolean(data.isAttendingReception),
  phoneNumber: parseString(data.phoneNumber),
  adultGuestNumber: parseNumber(data.adultGuestNumber),
  childrenGuestNumber: parseNumber(data.childrenGuestNumber),
})
