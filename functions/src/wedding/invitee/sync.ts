import { Invitee, InviteeRSVP, parseInvitee, parseInviteeRSVP } from '~/types/model/wedding/invitee'
import { invitees as inviteesFirestoreFn, inviteeRSVP as inviteeRSVPFirestoreFn } from '~/lib/firebase/firestore/collections'
import { getSheetRows, getSheets } from '~/lib/google-sheets'
import { onRequest } from 'firebase-functions/v2/https'

const inviteePropertyIndexes: ('uid' | keyof Invitee)[] = [
  'uid',
  'name',
  'databasePhoneNumber',
  'invitationType',
  'adultGuestNumber',
  'childrenGuestNumber',
]

const inviteeRSVPPropertyIndexes: (keyof InviteeRSVP)[] = [
  'isAttendingReception', 
  'adultGuestNumber',
  'childrenGuestNumber'
]

const getInviteeRSVPIndexOffset = () => {
  if (!process.env.INVITEE_RSVP_START_COLUMN || !process.env.START_COLUMN) return 0
  return process.env.INVITEE_RSVP_START_COLUMN.charCodeAt(0) - process.env.START_COLUMN.charCodeAt(0)
}

const getInviteeMapFromSpreadsheet = async () => {
  const sheets = await getSheets()

  const range = `${process.env.START_COLUMN}${process.env.START_ROW}:${process.env.END_COLUMN}${process.env.END_ROW}`
  const rows = (await getSheetRows(sheets, range)) || []

  const inviteeMap = new Map<string, Invitee>()
  const inviteeRSVPMap = new Map<string, InviteeRSVP | undefined>()

  rows.forEach(row => {
    if (!row.some(cell => !!cell)) return

    const inviteeUid = row[0]
    if (!inviteeUid) return

    // create Invitee object from spreadsheet data
    const invitee = inviteePropertyIndexes.reduce<Invitee>(
      (result, property, index) => ({
        ...result,
        [property]: row[index],
      }),
      parseInvitee({})
    )
    inviteeMap.set(inviteeUid, parseInvitee(invitee))

    // create InviteeRSVP object from spreadsheet data
    const inviteeRSVPIndexOffset = getInviteeRSVPIndexOffset()
    const inviteeRSVP = inviteeRSVPPropertyIndexes.reduce<InviteeRSVP | undefined>(
      (result, property, index) => {
        if (!result) return
        
        const hasResponded = row[inviteeRSVPIndexOffset]
        if (!hasResponded) return

        return {
          ...result,
          [property]: row[index + inviteeRSVPIndexOffset + 1]
        }
      },
      parseInviteeRSVP({})
    )

    if (inviteeRSVP) {
      inviteeRSVP.phoneNumber = invitee.databasePhoneNumber
    }
    inviteeRSVPMap.set(inviteeUid, parseInviteeRSVP(inviteeRSVP))
  })

  return {
    inviteeMap,
    inviteeRSVPMap
  }
}

export const sync = onRequest(async (_, res) => {
  const inviteesFirestore = inviteesFirestoreFn()
  const inviteeRSVPFirestore = inviteeRSVPFirestoreFn()

  const { inviteeMap: inviteeMapFromSpreadsheet, inviteeRSVPMap: inviteeRSVPMapFromSpreadsheet } = await getInviteeMapFromSpreadsheet()

  // remove invitees that don't exist in spreadsheet
  const inviteeCollectionMap = await inviteesFirestore.loadCollection()
  const inviteeUidsToDelete: string[] = []
  for (const uid of inviteeCollectionMap.keys()) {
    if (!inviteeMapFromSpreadsheet.has(uid)) {
      inviteeUidsToDelete.push(uid)
    }
  }
  await inviteesFirestore.bulkDelete(inviteeUidsToDelete)

  // add invitees from spreadsheet to firestore
  await inviteesFirestore.bulkInsertMap(inviteeMapFromSpreadsheet)

  // remove inviteeRSVP that don't exist in spreadsheet
  const inviteeRSVPUidsToDelete: string[] = [...inviteeUidsToDelete]
  for (const uid of inviteeRSVPMapFromSpreadsheet.keys()) {
    if (!inviteeRSVPMapFromSpreadsheet.get(uid)) {
      inviteeRSVPMapFromSpreadsheet.delete(uid)
      inviteeRSVPUidsToDelete.push(uid)
    }
  }
  await inviteeRSVPFirestore.bulkDelete(inviteeRSVPUidsToDelete)

  // add inviteeRSVP from spreadsheet to firestore
  // undefined values were removed in the above loop so can remove undefined by type assertion
  await inviteeRSVPFirestore.bulkInsertMap(inviteeRSVPMapFromSpreadsheet as Map<string, InviteeRSVP>)

  res.end()
})
