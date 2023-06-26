import type { InvitationType } from '~/types/model/wedding/invitee'

export const getIsReceptionInvitation = (invitationType?: InvitationType) =>
  invitationType === 'reception'
export const getIsMatrimonyInvitation = (invitationType?: InvitationType) =>
  invitationType === 'matrimony'
export const getIsNotInvited = (invitationType?: string) =>
  !invitationType || !['reception', 'matrimony'].includes(invitationType)
