import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import FirestoreQueryBuilder from '~/lib/firebase/firestore/FirestoreQueryBuilder'

export default class FirestoreWrapper<T extends DocumentData> {
  private firestore: Firestore
  private path: string
  private parse: (data: DocumentData) => T
  constructor(
    firestore: FirestoreWrapper<T>['firestore'],
    path: FirestoreWrapper<T>['path'],
    parse: FirestoreWrapper<T>['parse']
  ) {
    this.firestore = firestore
    this.path = path
    this.parse = parse
  }

  public get collectionReference(): CollectionReference {
    return collection(this.firestore, this.path)
  }

  private getDocumentReference(id: string): DocumentReference {
    return doc(this.collectionReference, id)
  }

  private querySnapshotToMap(qs: QuerySnapshot): Map<string, T> | undefined {
    if (qs.empty) return
    const map = new Map<string, T>()
    qs.forEach((snapshot: QueryDocumentSnapshot) => {
      const snapshotData = this.parse(snapshot.data())
      map.set(snapshot.id, snapshotData)
    })
    return map
  }

  public getNewId() {
    const docRef = doc(this.collectionReference)
    return docRef.id
  }

  public async loadCollection(query: FirestoreQueryBuilder<T>): Promise<Map<string, T>> {
    const querySnapshot = await getDocs(query.build(this.collectionReference))
    return this.querySnapshotToMap(querySnapshot)
  }

  public subscribeCollection(query: FirestoreQueryBuilder<T>, fn: (map: Map<string, T>) => void) {
    return onSnapshot(query.build(this.collectionReference), (querySnapshot: QuerySnapshot) => {
      const data = querySnapshot.empty ? null : this.querySnapshotToMap(querySnapshot)
      fn(data)
    })
  }

  public async loadDocument(id: string) {
    const snapshot = await getDoc(this.getDocumentReference(id))
    return snapshot.data()
  }

  public subscribeDocument(id: string, fn: (data: T | null) => void) {
    return onSnapshot(this.getDocumentReference(id), querySnapshot => {
      const data = querySnapshot.exists ? this.parse(querySnapshot.data()) : null
      fn(data)
    })
  }

  public push(values: T): Promise<DocumentReference> {
    return addDoc(this.collectionReference, this.parse(values))
  }

  public set(id: string, val: T): Promise<void> {
    return setDoc(this.getDocumentReference(id), val)
  }

  public update<K extends keyof T>(id: string, val: Record<K, T[K]>): Promise<void> {
    return updateDoc(this.getDocumentReference(id), val)
  }

  public delete(id: string): Promise<void> {
    return deleteDoc(this.getDocumentReference(id))
  }
}
