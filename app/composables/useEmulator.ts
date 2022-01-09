import { connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectStorageEmulator } from 'firebase/storage'

const useEmulator = () => {
  const $firebase = useNuxtApp().$firebase
  const firestore = $firebase.firestore.instance
  const auth = $firebase.auth.instance
  const storage = $firebase.storage.instance
  const firebaseEmulator = useRuntimeConfig().firebaseEmulator as {
    [key: string]: string
  }
  onMounted(() => {
    connectAuthEmulator(auth, `http://${firebaseEmulator.host}:${firebaseEmulator.authPort}`)
    connectFirestoreEmulator(
      firestore,
      firebaseEmulator.host,
      Number(firebaseEmulator.firestorePort)
    )
    connectStorageEmulator(storage, firebaseEmulator.host, Number(firebaseEmulator.storagePort))
  })
}

export default useEmulator
