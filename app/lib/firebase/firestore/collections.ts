import { Firestore } from 'firebase/firestore'
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

export default (firestore: Firestore) => ({
  posts: () => new FirestoreWrapper<Post>(firestore, 'posts', parsePost),
  postContents: (postId: string) =>
    new FirestoreWrapper<PostContent>(firestore, `posts/${postId}/contents`, parsePostContent),
  postComments: (postId: string) =>
    new FirestoreWrapper<PostComment>(firestore, `posts/${postId}/comments`, parsePostComment),
  imageFiles: () => new FirestoreWrapper<ImageFile>(firestore, 'imageFiles', parseImageFile),
  tags: () => new FirestoreWrapper<Tag>(firestore, 'tags', parseTag),
  users: () => new FirestoreWrapper<User>(firestore, 'users', parseUser),
  roles: () => new FirestoreWrapper<Role>(firestore, 'roles', parseRole),
})
