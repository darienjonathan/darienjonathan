import { ImageFile, parseImageFile } from '~/types/model/imageFile'
import {
  parsePost,
  parsePostComment,
  parsePostContent,
  Post,
  PostComment,
  PostContent,
} from '~/types/model/post'
import { parseRole, Role } from '~/types/model/role'
import { parseTag, Tag } from '~/types/model/tag'
import { parseUser, parseUserInfo, User, UserInfo } from '~/types/model/user'
import useFirestore from '~/composables/firebase/firestore/useFirestore'

const useFirestoreCollections = () => {
  const usePosts = () => useFirestore<Post>('posts', parsePost)
  const usePostContents = (postId: string) =>
    useFirestore<PostContent>(`posts/${postId}/contents`, parsePostContent)
  const usePostComments = (postId: string) =>
    useFirestore<PostComment>(`posts/${postId}/comments`, parsePostComment)
  const useImageFiles = () => useFirestore<ImageFile>('imageFiles', parseImageFile)
  const useTags = () => useFirestore<Tag>('tags', parseTag)
  const useUsers = () => useFirestore<User>('users', parseUser)
  const useUserInfo = () => useFirestore<UserInfo>('userInfo', parseUserInfo)
  const useRoles = () => useFirestore<Role>('roles', parseRole)
  return {
    usePosts,
    usePostContents,
    usePostComments,
    useImageFiles,
    useTags,
    useUsers,
    useUserInfo,
    useRoles,
  }
}

export default useFirestoreCollections
