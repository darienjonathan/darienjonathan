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
import { parseUser, User } from '~/types/model/user'

export default {
  posts: () => new FirestoreWrapper<Post>('posts', 'posts/{postUid}', parsePost),
  postContents: (postId: string) =>
    new FirestoreWrapper<PostContent>(
      `posts/${postId}/contents`,
      'posts/{postUid}/contents/{contentUid}',
      parsePostContent
    ),
  postComments: (postId: string) =>
    new FirestoreWrapper<PostComment>(
      `posts/${postId}/comments`,
      'posts/{postUid}/comments/{commentUid}',
      parsePostComment
    ),
  imageFiles: () =>
    new FirestoreWrapper<ImageFile>('imageFiles', 'imageFiles/{imageFileUid}', parseImageFile),
  tags: () => new FirestoreWrapper<Tag>('tags', 'tags/{tagUid}', parseTag),
  users: () => new FirestoreWrapper<User>('users', 'users/{userUid}', parseUser),
  roles: () => new FirestoreWrapper<Role>('roles', 'roles/{roleUid}', parseRole),
}
