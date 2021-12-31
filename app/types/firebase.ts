export const SIGNIN_STATUS = <const>{
  NOT_YET: 'NOT_YET',
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
}

export type SIGNIN_STATUS_TYPE = typeof SIGNIN_STATUS[keyof typeof SIGNIN_STATUS]
