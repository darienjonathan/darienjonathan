import { FirebaseOptions, initializeApp } from 'firebase/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const app = initializeApp(config.firebaseConfig as FirebaseOptions)
  return {
    provide: {
      firebaseApp: app,
    },
  }
})
