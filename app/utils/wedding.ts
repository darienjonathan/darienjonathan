import type { InvitationType } from '~/types/model/wedding/invitee'

export const getIsReceptionInvitation = (invitationType?: InvitationType) =>
  invitationType === 'reception'
export const getIsMatrimonyInvitation = (invitationType?: InvitationType) =>
  invitationType === 'matrimony'
export const getIsNotInvited = (invitationType?: InvitationType) =>
  !invitationType || !['reception', 'matrimony'].includes(invitationType)
