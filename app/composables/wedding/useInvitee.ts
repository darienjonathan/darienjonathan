import { Invitee, InviteeRSVP } from 'types/model/wedding/invitee'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

export const useInvitee = (invitee?: Invitee | null, inviteeRSVP?: InviteeRSVP | null) => {
  const config = useRuntimeConfig().public.wedding
  const isBeforeRSVPDeadline = computed(() =>
    dayjs().isSameOrBefore(dayjs.unix(config.rsvpDeadline))
  )

  const isReceptionInvitation = computed(
    () =>
      getIsReceptionInvitation(invitee?.invitationType) &&
      (isBeforeRSVPDeadline.value || inviteeRSVP?.isAttendingReception !== false)
  )

  const canRSVP = computed<boolean>(() => {
    if (!isReceptionInvitation.value) return false
    return !inviteeRSVP
  })

  const canEditRSVP = computed<boolean>(() => {
    if (!isReceptionInvitation.value) return false
    return !!inviteeRSVP && isBeforeRSVPDeadline.value
  })

  const canReviewRSVP = computed<boolean>(() => {
    if (!isReceptionInvitation.value) return false
    return !!inviteeRSVP
  })

  const shouldContact = computed<boolean>(() => {
    if (!isReceptionInvitation.value) return false
    if (canRSVP || canEditRSVP) return false
    return !isBeforeRSVPDeadline.value
  })

  const rsvpDeadlineString = computed(() => dayjs.unix(config.rsvpDeadline).format('MMMM D, YYYY'))

  return {
    isBeforeRSVPDeadline,
    isReceptionInvitation,
    canRSVP,
    canEditRSVP,
    canReviewRSVP,
    shouldContact,
    rsvpDeadlineString,
  }
}
