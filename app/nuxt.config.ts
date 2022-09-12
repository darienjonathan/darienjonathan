import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
      },
    ],
  },
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
    firebaseEmulator: {
      host: process.env.EMULATOR_HOST,
      authPort: process.env.EMULATOR_AUTH_PORT,
      functionsPort: process.env.EMULATOR_FUNCTIONS_PORT,
      firestorePort: process.env.EMULATOR_FIRESTORE_PORT,
      hostingPort: process.env.EMULATOR_HOSTING_PORT,
      storagePort: process.env.EMULATOR_STORAGE_PORT,
      authEmail: process.env.EMULATOR_AUTH_EMAIL,
      authPassword: process.env.EMULATOR_AUTH_PASSWORD,
    },
    proposalPagePassword: process.env.DAISY_PAGE_PASSWORD,
  },
  css: ['@/assets/css/global.scss'],
  vue: {
    config: {
      devtools: true,
      productionTip: false,
    },
  },
  buildModules: ['vite-plugin-vue-type-imports/nuxt'],
})
