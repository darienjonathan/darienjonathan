import {
  connectStorageEmulator,
  deleteObject,
  getDownloadURL as getItemDownloadURL,
  getStorage,
  listAll,
  ref as reference,
  StorageReference,
  StringFormat,
  uploadBytes,
  UploadMetadata,
  uploadString,
} from 'firebase/storage'
import getMime, { getBase64Mime } from '~/utils/getMime'

interface PutArgs<T extends File | string> {
  file: T
  fileName: string
  customMetadata?: UploadMetadata['customMetadata']
}

interface PutStringArgs extends PutArgs<string> {
  stringFormat?: StringFormat
}

const useStorage = (path: string, allowedTypes?: string[]) => {
  const storage = getStorage(useNuxtApp().$firebase.app)

  if (process.env.NODE_ENV === 'development') {
    connectStorageEmulator(
      storage,
      process.env.EMULATOR_HOST,
      Number(process.env.EMULATOR_STORAGE_PORT)
    )
  }

  const storageRef = computed(() => reference(storage, path))

  const getFileRef = (fileName: string): StorageReference => reference(storageRef.value, fileName)

  const validate = (type: string): boolean => (allowedTypes ? allowedTypes.includes(type) : true)

  const createMetadata = (
    customMetadata: UploadMetadata['customMetadata'],
    type: string | undefined
  ): UploadMetadata => {
    return {
      ...customMetadata,
      ...(type && { contentType: type }),
    }
  }

  const getDownloadURL = (fileName: string): Promise<string> =>
    getItemDownloadURL(getFileRef(fileName))

  const list = computed(() => listAll(storageRef.value))

  const put = async ({ file, fileName, customMetadata }: PutArgs<File>) => {
    const type = await getMime(file)
    const isValidated = validate(type)
    if (!isValidated) {
      throw new Error('File validation failed')
    }
    try {
      const metadata = createMetadata(customMetadata, type)
      const snapshot = await uploadBytes(getFileRef(fileName), file, metadata)
      return snapshot
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  const putString = async ({
    file,
    fileName,
    stringFormat = StringFormat.RAW,
    customMetadata,
  }: PutStringArgs) => {
    let metadata: UploadMetadata = customMetadata
    if (stringFormat === StringFormat.BASE64) {
      const type = getBase64Mime(file)
      const isValidated = validate(type)
      if (!isValidated) {
        throw new Error('File validation failed')
      }
      metadata = createMetadata(customMetadata, type)
    }
    try {
      const snapshot = await uploadString(getFileRef(fileName), file, stringFormat, metadata)
      return snapshot
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  const deleteItem = (fileName: string) => deleteObject(getFileRef(fileName))

  return {
    getDownloadURL,
    list,
    put,
    putString,
    deleteItem,
  }
}

export default useStorage
