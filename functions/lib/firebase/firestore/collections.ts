import FirestoreWrapper from '~/lib/firebase/firestore/Firestore'
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

const posts = () => new FirestoreWrapper<Post>('posts', 'posts/{postUid}', parsePost)
const postContents = (postId: string) =>
  new FirestoreWrapper<PostContent>(
    `posts/${postId}/contents`,
    'posts/{postUid}/contents/{contentUid}',
    parsePostContent
  )
const postComments = (postId: string) =>
  new FirestoreWrapper<PostComment>(
    `posts/${postId}/comments`,
    'posts/{postUid}/comments/{commentUid}',
    parsePostComment
  )
const imageFiles = () =>
  new FirestoreWrapper<ImageFile>('imageFiles', 'imageFiles/{imageFileUid}', parseImageFile)
const tags = () => new FirestoreWrapper<Tag>('tags', 'tags/{tagUid}', parseTag)
const users = () => new FirestoreWrapper<User>('users', 'users/{userUid}', parseUser)
const userInfo = () =>
  new FirestoreWrapper<UserInfo>('userInfo', 'userInfo/{userUid}', parseUserInfo)
const roles = () => new FirestoreWrapper<Role>('roles', 'roles/{roleUid}', parseRole)

export { posts, postContents, postComments, imageFiles, tags, users, userInfo, roles }
