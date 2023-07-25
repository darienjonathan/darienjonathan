import { invitees, inviteeRSVP } from '~/lib/firebase/firestore/collections'

// on delete, delete corresponding inviteeRSVP
export const onDelete = invitees().trigger.onDelete((_, context) => {
  const { inviteeUid } = context.params
  return inviteeRSVP().deleteDocument(inviteeUid)
})
