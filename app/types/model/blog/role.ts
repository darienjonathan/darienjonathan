/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseArray, parseString } from '~/types/model/parse'

export interface Role {
  name: string
  writePermission: string[]
  readPermission: string[]
}

export const parseRole = (data: any): Role => ({
  name: parseString(data.name),
  writePermission: parseArray(data.writePermission, parseString),
  readPermission: parseArray(data.readPermission, parseString),
})
