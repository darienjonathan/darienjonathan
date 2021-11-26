import { FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebase = useNuxtApp().$firebaseApp as FirebaseApp
  const firestore = getFirestore(firebase)
  return {
    provide: {
      firestore,
    },
  }
})
