import type { Wish } from '~/types/model/wedding/wish'
import { parseWish } from '~/types/model/wedding/wish'
import type { Media } from '~/types/model/blog/media'
import { parseMedia } from '~/types/model/blog/media'
import type { Post, PostComment } from '~/types/model/blog/post'
import { parsePost, parsePostComment } from '~/types/model/blog/post'
import type { Role } from '~/types/model/blog/role'
import { parseRole } from '~/types/model/blog/role'
import type { Tag } from '~/types/model/blog/tag'
import { parseTag } from '~/types/model/blog/tag'
import type { User, UserInfo } from '~/types/model/user'
import { parseUser, parseUserInfo } from '~/types/model/user'
import useFirestore from '~/composables/firebase/firestore/useFirestore'
import type { Question as DaisyProposalQuestion } from '~/types/model/others/daisy/proposal'
import { parseQuestion as parseDaisyProposalQuestion } from '~/types/model/others/daisy/proposal'
import type { Invitee, InviteeRSVP } from '~~/types/model/wedding/invitee'
import { parseInvitee, parseInviteeRSVP } from '~~/types/model/wedding/invitee'

const useFirestoreCollections = () => {
  const usePosts = () => useFirestore<Post>('posts', parsePost)
  const usePostComments = (postId: string) =>
    useFirestore<PostComment>(`posts/${postId}/comments`, parsePostComment)
  const useMedias = () => useFirestore<Media>('medias', parseMedia)
  const useTags = () => useFirestore<Tag>('tags', parseTag)
  const useUsers = () => useFirestore<User>('users', parseUser)
  const useUserInfo = () => useFirestore<UserInfo>('userInfo', parseUserInfo)
  const useRoles = () => useFirestore<Role>('roles', parseRole)

  // Proposal
  const useProposalQuestions = () =>
    useFirestore<DaisyProposalQuestion>('daisy-proposal', parseDaisyProposalQuestion)

  // Wedding
  const useInvitees = () => useFirestore<Invitee>('invitees', parseInvitee)
  const useInviteeRSVP = () => useFirestore<InviteeRSVP>('inviteeRSVP', parseInviteeRSVP)
  const useWishes = () => useFirestore<Wish>('wishes', parseWish)

  return {
    usePosts,
    usePostComments,
    useMedias,
    useTags,
    useUsers,
    useUserInfo,
    useRoles,
    useProposalQuestions,
    useInvitees,
    useInviteeRSVP,
    useWishes,
  }
}

export default useFirestoreCollections
