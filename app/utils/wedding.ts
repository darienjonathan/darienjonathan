import type { InvitationType } from '~/types/model/wedding/invitee'

export const getIsReception = (invitationType: InvitationType) => invitationType === 'reception'
export const getIsMatrimony = (invitationType: InvitationType) => invitationType === 'matrimony'
export const getIsNotInvited = (invitationType: InvitationType) => invitationType === 'none'
