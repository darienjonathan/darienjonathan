import { inviteeRSVP } from '~/lib/firebase/firestore/collections'
import { getSheetRows, getSheets, batchUpdate } from '~/lib/google-sheets'

// on write, update spreadsheet's data
export const onWrite = inviteeRSVP().trigger.onWrite(async (_, after, context) => {
  const { inviteeRSVPUid } = context.params

  const sheets = await getSheets()

  // fetch uids only to find the corresponding row to update
  const range = `${process.env.START_COLUMN}${process.env.START_ROW}`
  const rows = await getSheetRows(sheets, range)

  if (!rows?.length) return

  const uidIndex = rows.findIndex(row => row[0] === inviteeRSVPUid)
  if (uidIndex === -1) return

  const { isAttendingReception, name, phoneNumber, adultGuestNumber, childrenGuestNumber } = after

  const rowNumber = Number(process.env.START_ROW) + uidIndex
  const data = [
    {
      range: `${process.env.INVITEE_RSVP_START_COLUMN}${rowNumber}:${process.env.END_COLUMN}${rowNumber}`,
      values: [
        [true, isAttendingReception, name, phoneNumber, adultGuestNumber, childrenGuestNumber],
      ],
    },
  ]

  return batchUpdate(sheets, data)
})
