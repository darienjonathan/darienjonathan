import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  Unsubscribe,
} from 'firebase/firestore'
import { Ref } from 'nuxt3/dist/app/compat/capi'
import useFirestoreQueryBuilder from '~/composables/firebase/firestore/useFirestoreQueryBuilder'

const useFirestore = <T>(path: string, parse: (data: DocumentData) => T) => {
  const firestore = useNuxtApp().$firebase.firestore.instance

  const collectionReference: Ref<CollectionReference> = computed(() => collection(firestore, path))
  const queryBuilder = useFirestoreQueryBuilder(collectionReference.value)

  const getDocumentReference = (id: string): DocumentReference => doc(collectionReference.value, id)

  const querySnapshotToMap = (qs: QuerySnapshot): Map<string, T> | undefined => {
    if (qs.empty) return
    const map = new Map<string, T>()
    qs.forEach((snapshot: QueryDocumentSnapshot) => {
      const snapshotData = parse(snapshot.data())
      map.set(snapshot.id, snapshotData)
    })
    return map
  }

  const getNewId = (): string => {
    const docRef = doc(collectionReference.value)
    return docRef.id
  }

  const loadCollection = async (): Promise<Map<string, T>> => {
    const querySnapshot = await getDocs(queryBuilder.currentQuery.value)
    return querySnapshotToMap(querySnapshot)
  }

  const subscribeCollection = (fn: (map: Map<string, T>) => void): Unsubscribe => {
    return onSnapshot(queryBuilder.currentQuery.value, (querySnapshot: QuerySnapshot) => {
      const data = querySnapshot.empty ? null : querySnapshotToMap(querySnapshot)
      fn(data)
    })
  }

  const loadDocument = async (id: string): Promise<T | null> => {
    const snapshot = await getDoc(getDocumentReference(id))
    return snapshot.exists ? parse(snapshot.data()) : null
  }

  const loadDocumentByQuery = async (): Promise<
    | {
        id: string
        data: T
      }
    | undefined
  > => {
    const querySnapshot = await getDocs(queryBuilder.currentQuery.value)
    if (querySnapshot.empty) return
    const map = querySnapshotToMap(querySnapshot)
    const item = [...map][0]
    return {
      id: [...item][0] as string,
      data: [...item][1] as T,
    }
  }

  const subscribeDocument = (id: string, fn: (data: T | null) => void): Unsubscribe => {
    return onSnapshot(getDocumentReference(id), querySnapshot => {
      const data = querySnapshot.exists ? parse(querySnapshot.data()) : null
      fn(data)
    })
  }

  const push = (values: T): Promise<DocumentReference> => {
    return addDoc(collectionReference.value, parse(values))
  }

  const set = (id: string, val: T): Promise<void> => {
    return setDoc(getDocumentReference(id), val)
  }

  const update = <K extends keyof T>(id: string, val: Record<K, T[K]>): Promise<void> => {
    return updateDoc(getDocumentReference(id), val)
  }

  const deleteRecord = (id: string): Promise<void> => {
    return deleteDoc(getDocumentReference(id))
  }

  return {
    queryBuilder,
    getNewId,
    loadCollection,
    subscribeCollection,
    loadDocument,
    loadDocumentByQuery,
    subscribeDocument,
    push,
    set,
    update,
    deleteRecord,
  }
}

export default useFirestore
