import {
  CollectionReference,
  documentId,
  limit as limitFn,
  orderBy as orderByFn,
  Query,
  query,
  where,
} from 'firebase/firestore'
import { Unpacked } from '~/types/common'

export interface Queries {
  whereArgsArr: Parameters<typeof where>[]
  orderByArgs: Parameters<typeof orderByFn>
  limitArgs: number
}

const useFirestoreQueryBuilder = <T>(firestoreRef: CollectionReference<T>) => {
  const queries = reactive<Queries>({
    whereArgsArr: [],
    orderByArgs: null,
    limitArgs: 0,
  })

  const currentQuery = ref<Query<T>>(firestoreRef)

  const eq = <K extends keyof T>(prop: K, val: T[K]) => {
    queries.whereArgsArr.push([prop.toString(), '==', val])
  }

  const gt = <K extends keyof T>(prop: K, val: T[K]) => {
    queries.whereArgsArr.push([prop.toString(), '>', val])
  }

  const lt = <K extends keyof T>(prop: K, val: T[K]) => {
    queries.whereArgsArr.push([prop.toString(), '<', val])
  }

  const gteq = <K extends keyof T>(prop: K, val: T[K]) => {
    queries.whereArgsArr.push([prop.toString(), '>=', val])
  }

  const lteq = <K extends keyof T>(prop: K, val: T[K]) => {
    queries.whereArgsArr.push([prop.toString(), '<=', val])
  }

  const contains = <K extends keyof T>(prop: K, val: Unpacked<T[K]>) => {
    queries.whereArgsArr.push([prop.toString(), 'array-contains', val])
  }

  const inVals = <K extends keyof T>(prop: K, val: Array<T[K]>) => {
    if (val.length > 0) {
      queries.whereArgsArr.push([prop.toString(), 'in', val])
    }
  }

  const inIds = (val: string[]) => {
    if (val.length > 0) {
      queries.whereArgsArr.push([documentId(), 'in', val])
    }
  }

  const orderBy = (key: keyof T, dir: 'desc' | 'asc') => {
    queries.orderByArgs = [key.toString(), dir]
  }

  const limit = (n: number) => {
    queries.limitArgs = n
  }

  const build = (): Query<T> => {
    const whereQueryArr = queries.whereArgsArr.map(([fieldPath, opStr, val]) =>
      where(fieldPath, opStr, val)
    )
    const orderByQuery = queries.orderByArgs && orderByFn(...queries.orderByArgs)
    const limitQuery = queries.limitArgs && limitFn(queries.limitArgs)
    return query(firestoreRef, ...[...whereQueryArr, orderByQuery, limitQuery].filter(q => q))
  }

  watch(
    queries,
    () => {
      currentQuery.value = build()
    },
    {
      immediate: true,
    }
  )

  return {
    currentQuery,
    eq,
    gt,
    lt,
    gteq,
    lteq,
    contains,
    inVals,
    inIds,
    orderBy,
    limit,
    build,
  }
}

export default useFirestoreQueryBuilder
