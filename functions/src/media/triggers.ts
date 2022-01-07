import adminInstance from '~/lib/firebase'
import { medias } from '~/lib/firebase/firestore/collections'
import { Media } from '~/types/model/blog/media'

const deleteFile = (bucketPath: Media['bucketPath']) => {
  try {
    const storage = adminInstance.storage()
    return storage.bucket().file(bucketPath).delete()
  } catch (e) {
    return
  }
}

export const onChange = medias().trigger.onUpdate((before, after) => {
  if (before.bucketPath === after.bucketPath) {
    return
  }
  return deleteFile(before.bucketPath)
})

export const onDelete = medias().trigger.onDelete(snapshot => deleteFile(snapshot.bucketPath))
