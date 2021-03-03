import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
  ObjectID: any;
  Upload: any;
};

export type Login = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RefreshTokenInput = {
  token: Scalars['String'];
};

export type TokenPair = {
  __typename?: 'TokenPair';
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavouritePost: Scalars['String'];
  approvePost: Post;
  changePassword?: Maybe<Scalars['Boolean']>;
  createNameCard: NameCard;
  createPost: Post;
  createTodo: Todo;
  createUser: User;
  createWorship: Worship;
  deleteWorship: Scalars['Int'];
  login: TokenPair;
  pendPost: PendingPost;
  react: Post;
  readNotification: Notification;
  refreshToken: TokenPair;
  removeFavouritePost: Scalars['String'];
  updateNameCard: NameCard;
  updatePendingPost: PendingPost;
  updateUser: User;
  updateWorship: Worship;
};


export type MutationAddFavouritePostArgs = {
  input?: Maybe<UpdateFavouritePost>;
};


export type MutationApprovePostArgs = {
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
  postRefInput: UpdatePendingPost;
};


export type MutationChangePasswordArgs = {
  input: NewPassword;
};


export type MutationCreateNameCardArgs = {
  input: NewNameCard;
};


export type MutationCreatePostArgs = {
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationCreateWorshipArgs = {
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>>;
};


export type MutationDeleteWorshipArgs = {
  input?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  input: Login;
};


export type MutationPendPostArgs = {
  input: NewPendingPost;
  doc: Scalars['Upload'];
};


export type MutationReactArgs = {
  input: NewReaction;
};


export type MutationReadNotificationArgs = {
  input: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  input?: Maybe<RefreshTokenInput>;
};


export type MutationRemoveFavouritePostArgs = {
  input?: Maybe<UpdateFavouritePost>;
};


export type MutationUpdateNameCardArgs = {
  input: UpdateNameCard;
};


export type MutationUpdatePendingPostArgs = {
  input: UpdatePendingPost;
  doc?: Maybe<Scalars['Upload']>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
};


export type MutationUpdateWorshipArgs = {
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>>;
};

export type NameCard = {
  __typename?: 'NameCard';
  _id: Scalars['ObjectID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  remarks?: Maybe<Scalars['String']>;
  status: AccountStatus;
  lupdBy?: Maybe<Scalars['String']>;
  lupdDttm: Scalars['Time'];
};

export type NewNameCard = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
};

export type UpdateNameCard = {
  remarks?: Maybe<Scalars['String']>;
  status: AccountStatus;
};

export type Query = {
  __typename?: 'Query';
  favouritePosts: Array<Maybe<FavouritePost>>;
  maxWorshipId: Scalars['Int'];
  nameCard?: Maybe<NameCard>;
  nameCards: Array<NameCard>;
  notifications: Array<Maybe<Notification>>;
  pendingPost?: Maybe<PendingPost>;
  pendingPosts: Array<PendingPost>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  todos: Array<Todo>;
  user?: Maybe<User>;
  users: Array<User>;
  worship?: Maybe<Worship>;
  worships: Array<Worship>;
};


export type QueryNameCardArgs = {
  oid?: Maybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  toUsername: Scalars['String'];
};


export type QueryPendingPostArgs = {
  oid: Scalars['String'];
};


export type QueryPendingPostsArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryPostArgs = {
  oid: Scalars['String'];
};


export type QueryPostsArgs = {
  postFilter?: Maybe<PostFilter>;
  sort?: Maybe<PostSort>;
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryWorshipArgs = {
  worshipId?: Maybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ObjectID'];
  type: NotificationType;
  fromUsername?: Maybe<Scalars['String']>;
  toUsername?: Maybe<Scalars['String']>;
  targetId?: Maybe<Scalars['ObjectID']>;
  param?: Maybe<Scalars['String']>;
  isRead: Scalars['Boolean'];
  creDttm: Scalars['Time'];
};

export enum NotificationType {
  System = 'SYSTEM',
  Reaction = 'REACTION',
  Comment = 'COMMENT',
  Mention = 'MENTION',
  NewComerRequest = 'NEW_COMER_REQUEST',
  PostApproval = 'POST_APPROVAL',
  PostWithhold = 'POST_WITHHOLD',
  PostReject = 'POST_REJECT',
  PendPost = 'PEND_POST'
}




export type Post = {
  __typename?: 'Post';
  _id: Scalars['ObjectID'];
  parentId?: Maybe<Scalars['ObjectID']>;
  comments: Array<Maybe<Post>>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  type: PostType;
  content: Scalars['String'];
  username: Scalars['String'];
  user: User;
  creDttm: Scalars['Time'];
  reactions: Array<Maybe<Reaction>>;
  imageURI?: Maybe<Scalars['String']>;
  isFavourited: Scalars['Boolean'];
};

export type NewPost = {
  parentId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  type: PostType;
  content: Scalars['String'];
  username: Scalars['String'];
  toUsername?: Maybe<Scalars['String']>;
};

export type PendingPost = {
  __typename?: 'PendingPost';
  _id: Scalars['ObjectID'];
  username: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  documentURI: Scalars['String'];
  postID?: Maybe<Scalars['ObjectID']>;
  remarks?: Maybe<Scalars['String']>;
  creDttm: Scalars['Time'];
  status: PostStatus;
  approveUsername?: Maybe<Scalars['String']>;
  approveDttm?: Maybe<Scalars['Time']>;
};

export type NewPendingPost = {
  username: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
};

export type UpdatePendingPost = {
  _id: Scalars['String'];
  username: Scalars['String'];
  postID?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  status: PostStatus;
  approveUsername?: Maybe<Scalars['String']>;
};

export type FavouritePost = {
  __typename?: 'FavouritePost';
  _id: Scalars['ObjectID'];
  username: Scalars['String'];
  lupdDttm: Scalars['Time'];
  postID: Scalars['ObjectID'];
  post?: Maybe<Post>;
};

export type UpdateFavouritePost = {
  postID: Scalars['String'];
};

export type PostFilter = {
  AND?: Maybe<Array<PostFilter>>;
  OR?: Maybe<Array<PostFilter>>;
  username?: Maybe<Scalars['String']>;
  username_not?: Maybe<Scalars['String']>;
  username_in?: Maybe<Array<Scalars['String']>>;
  username_not_in?: Maybe<Array<Scalars['String']>>;
  username_contains?: Maybe<Scalars['String']>;
  username_not_contains?: Maybe<Scalars['String']>;
  username_starts_with?: Maybe<Scalars['String']>;
  username_not_starts_with?: Maybe<Scalars['String']>;
  username_ends_with?: Maybe<Scalars['String']>;
  username_not_ends_with?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  creDttm?: Maybe<Scalars['Time']>;
  creDttm_not?: Maybe<Scalars['Time']>;
  creDttm_in?: Maybe<Array<Scalars['Time']>>;
  creDttm_not_in?: Maybe<Array<Scalars['Time']>>;
  creDttm_lt?: Maybe<Scalars['Time']>;
  creDttm_lte?: Maybe<Scalars['Time']>;
  creDttm_gt?: Maybe<Scalars['Time']>;
  creDttm_gte?: Maybe<Scalars['Time']>;
};

export enum PostSort {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  CreDttmAsc = 'creDttm_ASC',
  CreDttmDesc = 'creDttm_DESC',
  ReactionsCountAsc = 'reactionsCount_ASC',
  ReactionsCountDesc = 'reactionsCount_DESC'
}

export enum PostType {
  Sharing = 'SHARING',
  Preacher = 'PREACHER'
}

export enum PostStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Withdraw = 'WITHDRAW',
  Withhold = 'WITHHOLD'
}

export enum ReactionType {
  Hallelujah = 'HALLELUJAH',
  Pray = 'PRAY'
}

export type Reaction = {
  __typename?: 'Reaction';
  _id: Scalars['ObjectID'];
  postOID: Scalars['ObjectID'];
  type: ReactionType;
  username: Scalars['String'];
  creDttm: Scalars['Time'];
};

export type NewReaction = {
  username: Scalars['String'];
  toUsername?: Maybe<Scalars['String']>;
  postOID: Scalars['String'];
  type: ReactionType;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  text: Scalars['String'];
  done: Scalars['Boolean'];
  username: Scalars['String'];
};

export type NewTodo = {
  text: Scalars['String'];
  username: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Worker = 'WORKER',
  Member = 'MEMBER',
  Public = 'PUBLIC'
}

export enum AccountStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Contacting = 'CONTACTING'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  name: Scalars['String'];
  nameC: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  titleC?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Time']>;
  gender: Gender;
  profilePicURI?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  status?: Maybe<AccountStatus>;
  creBy: Scalars['String'];
  creDttm: Scalars['Time'];
  lupdBy: Scalars['String'];
  lupdDttm: Scalars['Time'];
};

export type NewUser = {
  username: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  name: Scalars['String'];
  nameC: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  titleC?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  gender: Gender;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  status?: Maybe<AccountStatus>;
  creBy: Scalars['String'];
};

export type UpdateUser = {
  username: Scalars['String'];
  role: Role;
  name: Scalars['String'];
  nameC: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  titleC?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Time']>;
  gender: Gender;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  status?: Maybe<AccountStatus>;
  profilePic?: Maybe<Scalars['Upload']>;
};

export type NewPassword = {
  username: Scalars['String'];
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Worship = {
  __typename?: 'Worship';
  worshipId: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  messenger: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  verse?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  docs: Array<WorshipDoc>;
};

export type WorshipDoc = {
  __typename?: 'WorshipDoc';
  title?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type NewWorship = {
  worshipId: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  messenger: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  verse?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type NewWorshipDoc = {
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};
