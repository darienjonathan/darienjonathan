import * as functions from 'firebase-functions'
import { onCreate as onUserCreate, onDelete as onUserDelete } from 'src/auth/triggers'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

export { helloWorld, onUserCreate, onUserDelete }
