import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
  UploadMetadata,
  uploadString,
} from 'firebase/storage'
import getMime, { getBase64Mime } from '~~/utils/getMime'

interface PutArgs<T extends File | string> {
  file: T
  fileName: string
  customMetadata?: {
    [field: string]: string
  }
}

interface Constructor {
  storage: FirebaseStorage
  path: string
  allowedTypes: string[]
}

export default class Storage {
  private storage: Constructor['storage']
  private path: Constructor['path']
  private allowedTypes: Constructor['allowedTypes']
  constructor({ storage, path, allowedTypes }: Constructor) {
    this.storage = storage
    this.path = path
    this.allowedTypes = allowedTypes
  }

  private get ref(): StorageReference {
    return ref(this.storage, this.path)
  }

  private getFileRef(fileName: string): StorageReference {
    return ref(this.ref, fileName)
  }

  private validate(type: string) {
    return this.allowedTypes.includes(type)
  }

  private createMetadata(type: string, customMetadata: UploadMetadata['customMetadata']) {
    return {
      contentType: type,
      ...customMetadata,
    }
  }

  public getDownloadURL(fileName: string): Promise<string> {
    return getDownloadURL(this.getFileRef(fileName))
  }

  public list() {
    return listAll(this.ref)
  }

  public async put({ file, fileName, customMetadata }: PutArgs<File>) {
    const type = await getMime(file)
    const isValidated = this.validate(type)
    if (!isValidated) {
      throw new Error('File validation failed')
    }
    try {
      const metadata = this.createMetadata(type, customMetadata)
      const snapshot = await uploadBytes(this.getFileRef(fileName), file, metadata)
      return snapshot
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  public async putBase64({ file, fileName, customMetadata }: PutArgs<string>) {
    const type = getBase64Mime(file)
    const isValidated = this.validate(type)
    if (!isValidated) {
      throw new Error('File validation failed')
    }
    try {
      const metadata = this.createMetadata(type, customMetadata)
      const snapshot = await uploadString(this.getFileRef(fileName), file, 'base64', metadata)
      return snapshot
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  public delete(fileName: string) {
    return deleteObject(this.getFileRef(fileName))
  }
}
