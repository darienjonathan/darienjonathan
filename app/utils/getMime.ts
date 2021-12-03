/* eslint-disable no-undef */

// https://gist.github.com/andene/779b91c47c5654da4bce9ad7251bd3f6
const getMimeType = (signature: string): string => {
  switch (signature) {
    case '89504E47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case '25504446':
      return 'application/pdf'
    case 'FFD8FFDB':
    case 'FFD8FFE0':
      return 'image/jpeg'
    case '504B0304':
      return 'application/zip'
    default:
      return ''
  }
}

export default (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onloadend = event => {
      if (event.target && event.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(event.target.result as ArrayBuffer)
        const bytes: string[] = []
        uint.forEach(byte => {
          bytes.push(byte.toString(16))
        })
        const hex = bytes.join('').toUpperCase()
        resolve(getMimeType(hex))
      }
    }
    fileReader.onerror = () => {
      reject(new Error('file validation failed'))
    }

    const blob = file.slice(0, 4)
    fileReader.readAsArrayBuffer(blob)
  })
}

export const getBase64Mime = (base64String: string) => {
  const regex = /^data:(.+);base64,/
  const exec = regex.exec(base64String)
  if (!exec) {
    throw new Error('file validation failed')
  }
  return exec[1]
}
