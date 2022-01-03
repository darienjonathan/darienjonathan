import { Media, parseMedia } from '~/types/model/blog/media'
import { parsePost, parsePostComment, Post, PostComment } from '~/types/model/blog/post'
import { parseRole, Role } from '~/types/model/blog/role'
import { parseTag, Tag } from '~/types/model/blog/tag'
import { parseUser, parseUserInfo, User, UserInfo } from '~/types/model/user'
import useFirestore from '~/composables/firebase/firestore/useFirestore'

const useFirestoreCollections = () => {
  const usePosts = () => useFirestore<Post>('posts', parsePost)
  const usePostComments = (postId: string) =>
    useFirestore<PostComment>(`posts/${postId}/comments`, parsePostComment)
  const useMedias = () => useFirestore<Media>('medias', parseMedia)
  const useTags = () => useFirestore<Tag>('tags', parseTag)
  const useUsers = () => useFirestore<User>('users', parseUser)
  const useUserInfo = () => useFirestore<UserInfo>('userInfo', parseUserInfo)
  const useRoles = () => useFirestore<Role>('roles', parseRole)
  return {
    usePosts,
    usePostComments,
    useMedias,
    useTags,
    useUsers,
    useUserInfo,
    useRoles,
  }
}

export default useFirestoreCollections
