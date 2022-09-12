import {
  AuthError,
  createUserWithEmailAndPassword,
  deleteUser as deleteUserFn,
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
import { SignInStatus } from '~/types/firebase'

const useAuth = () => {
  const auth = getAuth(useNuxtApp().$firebase.app)

  const unsubscribe = ref<Unsubscribe>(undefined)
  const user = ref<User | null | undefined>(undefined)
  onMounted(() => {
    unsubscribe.value = onAuthStateChanged(auth, authUser => {
      user.value = authUser
    })
  })
  onUnmounted(() => {
    unsubscribe.value()
  })

  const signInStatus = computed<{ [key in SignInStatus]: boolean }>(() => ({
    signedIn: user.value !== undefined && user.value !== null,
    signedOut: user.value === null,
    notYet: user.value === undefined,
  }))

  const userUid = computed(() => user.value?.uid)

  const signUp = (email: string, password: string): Promise<UserCredential> => {
    try {
      return createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error as AuthError)
    }
  }

  const signIn = (email: string, password: string): Promise<UserCredential> => {
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

  const sendPasswordResetEmail = (email: string) => {
    if (!user.value) return
    return sendPasswordResetEmailFn(auth, email)
  }

  const deleteUser = () => {
    if (!user.value) return
    return deleteUserFn(user.value)
  }

  return {
    userUid,
    signInStatus,
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
