import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'
import collections from '~~/lib/firebase/firestore/collections'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const app = initializeApp(config.firebaseConfig as FirebaseOptions)
  const firestore = getFirestore(app)
  const functions = getFunctions(app)
  const storage = getStorage(app)
  return {
    provide: {
      firebase: {
        app,
        firestore: {
          interface: firestore,
          ...collections(firestore),
        },
        functions: {
          interface: functions,
        },
        storage: {
          interface: storage,
        },
      },
    },
  }
})
