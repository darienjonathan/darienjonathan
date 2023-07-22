import { onCreate as onUserCreate, onDelete as onUserDelete } from 'src/auth/triggers'
import { onChange as onMediaChange, onDelete as onMediaDelete } from 'src/media/triggers'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export { onUserCreate, onUserDelete, onMediaChange, onMediaDelete }
