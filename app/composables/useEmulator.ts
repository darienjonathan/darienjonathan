import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

const useEmulator = () => {
  const app = useNuxtApp().$firebase.app
  const firestore = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const { signIn } = useAuth()
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

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signIn(firebaseEmulator.authEmail, firebaseEmulator.authPassword)
  })
}

export default useEmulator
