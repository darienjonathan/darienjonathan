/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseString } from '~/types/model/parse'
import { parseRole, Role } from '~/types/model/role'

export interface User {
  username: string
  email: string
  role: Role
}

export const parseUser = (data: any): User => ({
  username: parseString(data.username),
  email: parseString(data.email),
  role: parseRole(data.role),
})
