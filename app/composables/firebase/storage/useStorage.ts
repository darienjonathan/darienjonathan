import type { StorageReference, UploadMetadata } from 'firebase/storage'
import {
  deleteObject,
  listAll,
  ref as reference,
  StringFormat,
  uploadBytes,
  uploadString,
} from 'firebase/storage'
import { getBase64Mime } from '~/utils/getMime'

type PutArgs<T extends File | string> = {
  file: T
  fileName: string
  customMetadata?: UploadMetadata['customMetadata']
}

type PutStringArgs = PutArgs<string> & {
  stringFormat?: StringFormat
}

const useStorage = (path: string, allowedTypes?: string[]) => {
  const { instance: storage, getDownloadURL: storageGetDownloadURL } =
    useNuxtApp().$firebase.storage

  const storageRef = computed(() => reference(storage, path))

  const getFileRef = (fileName: string): StorageReference => reference(storageRef.value, fileName)

  const validate = (type: string): boolean => (allowedTypes ? allowedTypes.includes(type) : true)

  const authorUidMetadata = (authorUid: string) => ({
    authorUid,
  })

  const createMetadata = (
    customMetadata: UploadMetadata['customMetadata'],
    type: string | undefined,
  ): UploadMetadata => {
    return {
      ...customMetadata,
      ...(type && { contentType: type }),
    }
  }

  const getDownloadURL = (fileName: string): Promise<string> =>
    storageGetDownloadURL(getFileRef(fileName).fullPath)

  const list = () => listAll(storageRef.value)

  const put = async ({ file, fileName, customMetadata }: PutArgs<File>) => {
    const isValidated = validate(file.type)
    if (!isValidated) {
      throw new Error('File validation failed')
    }
    try {
      const metadata = createMetadata(customMetadata, file.type)
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
    let metadata: UploadMetadata | undefined = customMetadata
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
    authorUidMetadata,
    getDownloadURL,
    list,
    put,
    putString,
    deleteItem,
  }
}

export default useStorage
