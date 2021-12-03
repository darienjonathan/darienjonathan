import { CollectionReference, documentId, limit, orderBy, query, where } from 'firebase/firestore'
import { Unpacked } from '~/types/common'

type BuildQueryArgs = {
  whereArgsArr: Parameters<typeof where>[]
  orderByArgs: Parameters<typeof orderBy>
  limitArgs: Parameters<typeof limit>
}

export const ARRAY_ARGUMENT_MAX_LENGTH = 10

export default class FirestoreQueryBuilder<T> {
  private whereArgsArr: BuildQueryArgs['whereArgsArr'] = []
  private orderByArgs: BuildQueryArgs['orderByArgs'] = null
  private limitArgs: BuildQueryArgs['limitArgs']

  public eq<K extends keyof T>(prop: K, val: T[K]): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), '==', val])
    return this
  }

  public gt<K extends keyof T>(prop: K, val: T[K]): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), '>', val])
    return this
  }

  public lt<K extends keyof T>(prop: K, val: T[K]): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), '<', val])
    return this
  }

  public gteq<K extends keyof T>(prop: K, val: T[K]): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), '>=', val])
    return this
  }

  public lteq<K extends keyof T>(prop: K, val: T[K]): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), '<=', val])
    return this
  }

  public contains<K extends keyof T>(prop: K, val: Unpacked<T[K]>): FirestoreQueryBuilder<T> {
    this.whereArgsArr.push([prop.toString(), 'array-contains', val])
    return this
  }

  public in<K extends keyof T>(prop: K, val: Array<T[K]>): FirestoreQueryBuilder<T> {
    if (val.length > 0) {
      this.whereArgsArr.push([prop.toString(), 'in', val])
    }
    return this
  }

  public inIds(val: string[]): FirestoreQueryBuilder<T> {
    if (val.length > 0) {
      this.whereArgsArr.push([documentId(), 'in', val])
    }
    return this
  }

  public orderBy(key: keyof T, dir: 'desc' | 'asc') {
    this.orderByArgs = [key.toString(), dir]
    return this
  }

  public limit(n: BuildQueryArgs['limitArgs']) {
    this.limitArgs = n
    return this
  }

  public build(ref: CollectionReference) {
    const whereQueryArr = this.whereArgsArr.map(([fieldPath, opStr, val]) =>
      where(fieldPath, opStr, val)
    )
    const orderByQuery = this.orderByArgs && orderBy(...this.orderByArgs)
    const limitQuery = this.limitArgs && limit(...this.limitArgs)
    return query(ref, ...[...whereQueryArr, orderByQuery, limitQuery].filter(q => q))
  }
}
