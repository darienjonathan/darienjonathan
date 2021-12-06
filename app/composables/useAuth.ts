import {
  AuthError,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser as deleteUserFn,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail as sendPasswordResetEmailFn,
  signInWithEmailAndPassword,
  signOut as signOutFn,
  Unsubscribe,
  updateEmail as updateEmailFn,
  updatePassword as updatePasswordFn,
  updateProfile as updateProfileFn,
  User,
  UserCredential,
} from 'firebase/auth'
import * as firebaseui from 'firebaseui'

const useAuth = (email: string, password: string) => {
  const auth = getAuth(useNuxtApp().$firebase.app)

  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, process.env.EMULATOR_HOST + ':' + process.env.EMULATOR_AUTH_PORT)
  }

  const ui = new firebaseui.auth.AuthUI(auth)
  const unsubscribe = ref<Unsubscribe>(undefined)
  const user = ref<User>(undefined)
  onMounted(() => {
    unsubscribe.value = onAuthStateChanged(auth, authUser => {
      user.value = authUser
    })
  })
  onUnmounted(() => {
    unsubscribe.value()
  })

  const startUI = (elementID: string) => {
    ui.start(elementID, {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
    })
  }

  const signUp = (): Promise<UserCredential> => {
    try {
      return createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error as AuthError)
    }
  }

  const signIn = (): Promise<UserCredential> => {
    try {
      return signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error as AuthError)
    }
  }

  const signOut = () => {
    try {
      return signOutFn(auth)
    } catch (error) {
      return error as AuthError
    }
  }

  const updateProfile = (profile: Parameters<typeof updateProfileFn>[1]) => {
    if (!user.value) return
    return updateProfileFn(user.value, profile)
  }

  const updateEmail = (newEmail: string) => {
    if (!user.value) return
    return updateEmailFn(user.value, newEmail)
  }

  const updatePassword = (newPassword: string) => {
    if (!user.value) return
    return updatePasswordFn(user.value, newPassword)
  }

  const sendPasswordResetEmail = () => {
    if (!user.value) return
    return sendPasswordResetEmailFn(auth, email)
  }

  const deleteUser = () => {
    if (!user.value) return
    return deleteUserFn(user.value)
  }

  return {
    startUI,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,
    deleteUser,
  }
}

export default useAuth
