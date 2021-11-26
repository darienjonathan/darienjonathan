import { FirebaseApp } from 'firebase/app'
import { getFunctions } from 'firebase/functions'

export default defineNuxtPlugin(() => {
  const firebase = useNuxtApp().$firebaseApp as FirebaseApp
  const functions = getFunctions(firebase)
  return {
    provide: {
      functions,
    },
  }
})
