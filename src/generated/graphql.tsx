import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjectID: any;
  Time: any;
  Upload: any;
};

export enum AccountStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Contacting = 'CONTACTING'
}

export type FavouritePost = {
  __typename?: 'FavouritePost';
  _id: Scalars['ObjectID'];
  username: Scalars['String'];
  lupdDttm: Scalars['Time'];
  postID: Scalars['ObjectID'];
  post?: Maybe<Post>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Login = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNameCard: NameCard;
  updateNameCard: NameCard;
  login: TokenPair;
  refreshToken: TokenPair;
  readNotification: Notification;
  createPost: Post;
  pendPost: PendingPost;
  updatePendingPost: PendingPost;
  approvePost: Post;
  addFavouritePost: Scalars['String'];
  removeFavouritePost: Scalars['String'];
  react: Post;
  createTodo: Todo;
  createUser: User;
  changePassword?: Maybe<Scalars['Boolean']>;
  updateUser: User;
  createWorship: Worship;
  updateWorship: Worship;
  deleteWorship: Scalars['Int'];
};


export type MutationCreateNameCardArgs = {
  input: NewNameCard;
};


export type MutationUpdateNameCardArgs = {
  input: UpdateNameCard;
};


export type MutationLoginArgs = {
  input: Login;
};


export type MutationRefreshTokenArgs = {
  input?: Maybe<RefreshTokenInput>;
};


export type MutationReadNotificationArgs = {
  input: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
};


export type MutationPendPostArgs = {
  input: NewPendingPost;
  doc: Scalars['Upload'];
};


export type MutationUpdatePendingPostArgs = {
  input: UpdatePendingPost;
  doc?: Maybe<Scalars['Upload']>;
};


export type MutationApprovePostArgs = {
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
  postRefInput: UpdatePendingPost;
};


export type MutationAddFavouritePostArgs = {
  input?: Maybe<UpdateFavouritePost>;
};


export type MutationRemoveFavouritePostArgs = {
  input?: Maybe<UpdateFavouritePost>;
};


export type MutationReactArgs = {
  input: NewReaction;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationChangePasswordArgs = {
  input: NewPassword;
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
};


export type MutationCreateWorshipArgs = {
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>>;
};


export type MutationUpdateWorshipArgs = {
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>>;
};


export type MutationDeleteWorshipArgs = {
  input?: Maybe<Scalars['String']>;
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

export type NewPassword = {
  username: Scalars['String'];
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type NewPendingPost = {
  username: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
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

export type NewReaction = {
  username: Scalars['String'];
  toUsername?: Maybe<Scalars['String']>;
  postOID: Scalars['String'];
  type: ReactionType;
};

export type NewTodo = {
  text: Scalars['String'];
  username: Scalars['String'];
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

export type Node = {
  _id: Scalars['ObjectID'];
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


export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor: Scalars['ID'];
  endCursor: Scalars['ID'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
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

export type Post = Node & {
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

export enum PostStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Withdraw = 'WITHDRAW',
  Withhold = 'WITHHOLD'
}

export enum PostType {
  Sharing = 'SHARING',
  Preacher = 'PREACHER',
  News = 'NEWS'
}

export type PostsConnection = {
  __typename?: 'PostsConnection';
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<PostsEdge>>;
  posts?: Maybe<Array<Post>>;
  pageInfo: PageInfo;
};

export type PostsEdge = {
  __typename?: 'PostsEdge';
  cursor: Scalars['ID'];
  node?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  nameCards: Array<NameCard>;
  nameCard?: Maybe<NameCard>;
  notifications: Array<Maybe<Notification>>;
  posts: PostsConnection;
  post?: Maybe<Post>;
  pendingPosts: Array<PendingPost>;
  pendingPost?: Maybe<PendingPost>;
  favouritePosts: Array<Maybe<FavouritePost>>;
  todos: Array<Todo>;
  users: Array<User>;
  user?: Maybe<User>;
  worships: Array<Worship>;
  worship?: Maybe<Worship>;
  maxWorshipId: Scalars['Int'];
};


export type QueryNameCardArgs = {
  oid?: Maybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  toUsername: Scalars['String'];
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  postFilter?: Maybe<PostFilter>;
  sort?: Maybe<PostSort>;
};


export type QueryPostArgs = {
  oid: Scalars['String'];
};


export type QueryPendingPostsArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryPendingPostArgs = {
  oid: Scalars['String'];
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryWorshipArgs = {
  worshipId?: Maybe<Scalars['String']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  _id: Scalars['ObjectID'];
  postOID: Scalars['ObjectID'];
  type: ReactionType;
  username: Scalars['String'];
  creDttm: Scalars['Time'];
};

export enum ReactionType {
  Hallelujah = 'HALLELUJAH',
  Pray = 'PRAY'
}

export type RefreshTokenInput = {
  token: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Worker = 'WORKER',
  Member = 'MEMBER',
  Public = 'PUBLIC'
}


export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  text: Scalars['String'];
  done: Scalars['Boolean'];
  username: Scalars['String'];
};

export type TokenPair = {
  __typename?: 'TokenPair';
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateFavouritePost = {
  postID: Scalars['String'];
};

export type UpdateNameCard = {
  remarks?: Maybe<Scalars['String']>;
  status: AccountStatus;
};

export type UpdatePendingPost = {
  _id: Scalars['String'];
  username: Scalars['String'];
  postID?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  status: PostStatus;
  approveUsername?: Maybe<Scalars['String']>;
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

export type CreateNameCardMutationVariables = Exact<{
  input: NewNameCard;
}>;


export type CreateNameCardMutation = (
  { __typename?: 'Mutation' }
  & { createNameCard: (
    { __typename?: 'NameCard' }
    & Pick<NameCard, '_id' | 'name' | 'email' | 'phone' | 'gender'>
  ) }
);

export type NameCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type NameCardsQuery = (
  { __typename?: 'Query' }
  & { nameCards: Array<(
    { __typename?: 'NameCard' }
    & Pick<NameCard, '_id' | 'name' | 'email' | 'phone' | 'gender' | 'remarks' | 'status' | 'lupdDttm'>
  )> }
);

export type NotificationsQueryVariables = Exact<{
  toUsername: Scalars['String'];
}>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Array<Maybe<(
    { __typename?: 'Notification' }
    & Pick<Notification, '_id' | 'toUsername' | 'fromUsername' | 'type' | 'param' | 'isRead' | 'creDttm'>
  )>> }
);

export type ReadNotificationMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type ReadNotificationMutation = (
  { __typename?: 'Mutation' }
  & { readNotification: (
    { __typename?: 'Notification' }
    & Pick<Notification, '_id'>
  ) }
);

export type PostsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PostsConnection' }
    & Pick<PostsConnection, 'totalCount'>
    & { edges?: Maybe<Array<(
      { __typename?: 'PostsEdge' }
      & Pick<PostsEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Post' }
        & Pick<Post, '_id' | 'parentId' | 'title' | 'subtitle' | 'creDttm' | 'type' | 'imageURI' | 'isFavourited'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC'>
        ) }
      )> }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ) }
  ) }
);

export type PostQueryVariables = Exact<{
  oid: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm' | 'imageURI'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
    ), reactions: Array<Maybe<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'username' | 'type'>
    )>>, comments: Array<Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm' | 'username'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
      ), reactions: Array<Maybe<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'username' | 'type'>
      )>> }
    )>> }
  )> }
);

export type CreatePostMutationVariables = Exact<{
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
    ), reactions: Array<Maybe<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'username' | 'type'>
    )>>, comments: Array<Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
      ), reactions: Array<Maybe<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'username' | 'type'>
      )>> }
    )>> }
  ) }
);

export type PendPostMutationVariables = Exact<{
  input: NewPendingPost;
  doc: Scalars['Upload'];
}>;


export type PendPostMutation = (
  { __typename?: 'Mutation' }
  & { pendPost: (
    { __typename?: 'PendingPost' }
    & Pick<PendingPost, '_id'>
  ) }
);

export type PendingPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingPostsQuery = (
  { __typename?: 'Query' }
  & { pendingPosts: Array<(
    { __typename?: 'PendingPost' }
    & Pick<PendingPost, '_id' | 'username' | 'title' | 'subtitle' | 'documentURI' | 'postID' | 'remarks' | 'creDttm' | 'status' | 'approveUsername' | 'approveDttm'>
  )> }
);

export type PendingPostsByUsernameQueryVariables = Exact<{
  username?: Maybe<Scalars['String']>;
}>;


export type PendingPostsByUsernameQuery = (
  { __typename?: 'Query' }
  & { pendingPosts: Array<(
    { __typename?: 'PendingPost' }
    & Pick<PendingPost, '_id' | 'username' | 'title' | 'subtitle' | 'documentURI' | 'postID' | 'remarks' | 'creDttm' | 'status' | 'approveUsername' | 'approveDttm'>
  )> }
);

export type PendingPostQueryVariables = Exact<{
  oid: Scalars['String'];
}>;


export type PendingPostQuery = (
  { __typename?: 'Query' }
  & { pendingPost?: Maybe<(
    { __typename?: 'PendingPost' }
    & Pick<PendingPost, '_id' | 'username' | 'title' | 'subtitle' | 'documentURI' | 'postID' | 'remarks' | 'creDttm' | 'status' | 'approveUsername' | 'approveDttm'>
  )> }
);

export type UpdatePendingPostMutationVariables = Exact<{
  input: UpdatePendingPost;
  doc?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePendingPostMutation = (
  { __typename?: 'Mutation' }
  & { updatePendingPost: (
    { __typename?: 'PendingPost' }
    & Pick<PendingPost, '_id' | 'title' | 'subtitle' | 'postID' | 'status' | 'remarks' | 'approveUsername' | 'approveDttm'>
  ) }
);

export type ApprovePostMutationVariables = Exact<{
  input: NewPost;
  image?: Maybe<Scalars['Upload']>;
  postRefInput: UpdatePendingPost;
}>;


export type ApprovePostMutation = (
  { __typename?: 'Mutation' }
  & { approvePost: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
  ) }
);

export type FavouritePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FavouritePostsQuery = (
  { __typename?: 'Query' }
  & { favouritePosts: Array<Maybe<(
    { __typename?: 'FavouritePost' }
    & Pick<FavouritePost, '_id' | 'username' | 'lupdDttm'>
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'subtitle' | 'imageURI' | 'creDttm'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'role' | 'nameC' | 'titleC' | 'gender' | 'profilePicURI'>
      ) }
    )> }
  )>> }
);

export type AddFavouritePostMutationVariables = Exact<{
  input: UpdateFavouritePost;
}>;


export type AddFavouritePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addFavouritePost'>
);

export type RemoveFavouritePostMutationVariables = Exact<{
  input: UpdateFavouritePost;
}>;


export type RemoveFavouritePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFavouritePost'>
);

export type ReactMutationVariables = Exact<{
  input: NewReaction;
}>;


export type ReactMutation = (
  { __typename?: 'Mutation' }
  & { react: (
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
    ), reactions: Array<Maybe<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'username' | 'type'>
    )>>, comments: Array<Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, '_id' | 'title' | 'subtitle' | 'content' | 'creDttm'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'profilePicURI'>
      ), reactions: Array<Maybe<(
        { __typename?: 'Reaction' }
        & Pick<Reaction, 'username' | 'type'>
      )>> }
    )>> }
  ) }
);

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'email' | 'phone' | 'dob' | 'profilePicURI' | 'status'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'email' | 'phone' | 'dob' | 'profilePicURI' | 'status'>
  )> }
);

export type UserProfilePicUriQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserProfilePicUriQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'profilePicURI'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUser;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'name' | 'nameC' | 'role' | 'gender' | 'title' | 'titleC' | 'phone' | 'email' | 'profilePicURI'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  input: NewPassword;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken: (
    { __typename?: 'TokenPair' }
    & Pick<TokenPair, 'token' | 'refreshToken'>
  ) }
);

export type LoginMutationVariables = Exact<{
  input: Login;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'TokenPair' }
    & Pick<TokenPair, 'token' | 'refreshToken'>
  ) }
);

export type WorshipQueryVariables = Exact<{
  worshipId: Scalars['String'];
}>;


export type WorshipQuery = (
  { __typename?: 'Query' }
  & { worship?: Maybe<(
    { __typename?: 'Worship' }
    & Pick<Worship, 'worshipId' | 'title' | 'type' | 'messenger' | 'note' | 'verse' | 'link'>
    & { docs: Array<(
      { __typename?: 'WorshipDoc' }
      & Pick<WorshipDoc, 'title' | 'link' | 'type'>
    )> }
  )> }
);

export type WorshipsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorshipsQuery = (
  { __typename?: 'Query' }
  & { worships: Array<(
    { __typename?: 'Worship' }
    & Pick<Worship, 'worshipId' | 'title' | 'type' | 'messenger' | 'note' | 'verse' | 'link'>
    & { docs: Array<(
      { __typename?: 'WorshipDoc' }
      & Pick<WorshipDoc, 'title' | 'link' | 'type'>
    )> }
  )> }
);

export type MaxWorshipIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MaxWorshipIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'maxWorshipId'>
);

export type CreateWorshipMutationVariables = Exact<{
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>> | Maybe<NewWorshipDoc>;
}>;


export type CreateWorshipMutation = (
  { __typename?: 'Mutation' }
  & { createWorship: (
    { __typename?: 'Worship' }
    & Pick<Worship, 'worshipId' | 'title' | 'type' | 'messenger' | 'note' | 'link' | 'verse'>
    & { docs: Array<(
      { __typename?: 'WorshipDoc' }
      & Pick<WorshipDoc, 'title' | 'type' | 'link'>
    )> }
  ) }
);

export type UpdateWorshipMutationVariables = Exact<{
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>> | Maybe<NewWorshipDoc>;
}>;


export type UpdateWorshipMutation = (
  { __typename?: 'Mutation' }
  & { updateWorship: (
    { __typename?: 'Worship' }
    & Pick<Worship, 'worshipId' | 'title' | 'type' | 'messenger' | 'note' | 'link' | 'verse'>
    & { docs: Array<(
      { __typename?: 'WorshipDoc' }
      & Pick<WorshipDoc, 'title' | 'type' | 'link'>
    )> }
  ) }
);

export type DeleteWorshipMutationVariables = Exact<{
  input?: Maybe<Scalars['String']>;
}>;


export type DeleteWorshipMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorship'>
);


export const CreateNameCardDocument = gql`
    mutation createNameCard($input: NewNameCard!) {
  createNameCard(input: $input) {
    _id
    name
    email
    phone
    gender
  }
}
    `;
export type CreateNameCardMutationFn = Apollo.MutationFunction<CreateNameCardMutation, CreateNameCardMutationVariables>;

/**
 * __useCreateNameCardMutation__
 *
 * To run a mutation, you first call `useCreateNameCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNameCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNameCardMutation, { data, loading, error }] = useCreateNameCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNameCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateNameCardMutation, CreateNameCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNameCardMutation, CreateNameCardMutationVariables>(CreateNameCardDocument, options);
      }
export type CreateNameCardMutationHookResult = ReturnType<typeof useCreateNameCardMutation>;
export type CreateNameCardMutationResult = Apollo.MutationResult<CreateNameCardMutation>;
export type CreateNameCardMutationOptions = Apollo.BaseMutationOptions<CreateNameCardMutation, CreateNameCardMutationVariables>;
export const NameCardsDocument = gql`
    query nameCards {
  nameCards {
    _id
    name
    email
    phone
    gender
    remarks
    status
    lupdDttm
  }
}
    `;

/**
 * __useNameCardsQuery__
 *
 * To run a query within a React component, call `useNameCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNameCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNameCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNameCardsQuery(baseOptions?: Apollo.QueryHookOptions<NameCardsQuery, NameCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NameCardsQuery, NameCardsQueryVariables>(NameCardsDocument, options);
      }
export function useNameCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NameCardsQuery, NameCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NameCardsQuery, NameCardsQueryVariables>(NameCardsDocument, options);
        }
export type NameCardsQueryHookResult = ReturnType<typeof useNameCardsQuery>;
export type NameCardsLazyQueryHookResult = ReturnType<typeof useNameCardsLazyQuery>;
export type NameCardsQueryResult = Apollo.QueryResult<NameCardsQuery, NameCardsQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($toUsername: String!) {
  notifications(toUsername: $toUsername) {
    _id
    toUsername
    fromUsername
    type
    param
    isRead
    creDttm
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      toUsername: // value for 'toUsername'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const ReadNotificationDocument = gql`
    mutation readNotification($input: String!) {
  readNotification(input: $input) {
    _id
  }
}
    `;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const PostsDocument = gql`
    query posts($first: Int, $last: Int, $after: String, $before: String) {
  posts(first: $first, last: $last, after: $after, before: $before) {
    totalCount
    edges {
      node {
        _id
        parentId
        title
        subtitle
        creDttm
        type
        imageURI
        isFavourited
        user {
          username
          name
          nameC
          role
          gender
          title
          titleC
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostDocument = gql`
    query post($oid: String!) {
  post(oid: $oid) {
    _id
    title
    subtitle
    content
    creDttm
    imageURI
    user {
      username
      name
      nameC
      role
      gender
      title
      titleC
      profilePicURI
    }
    reactions {
      username
      type
    }
    comments {
      _id
      title
      subtitle
      content
      creDttm
      username
      user {
        username
        name
        nameC
        role
        gender
        title
        titleC
        profilePicURI
      }
      reactions {
        username
        type
      }
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      oid: // value for 'oid'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: NewPost!, $image: Upload) {
  createPost(input: $input, image: $image) {
    _id
    title
    subtitle
    content
    creDttm
    user {
      username
      name
      nameC
      role
      gender
      title
      titleC
      profilePicURI
    }
    reactions {
      username
      type
    }
    comments {
      _id
      title
      subtitle
      content
      creDttm
      user {
        username
        name
        nameC
        role
        gender
        title
        titleC
        profilePicURI
      }
      reactions {
        username
        type
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const PendPostDocument = gql`
    mutation pendPost($input: NewPendingPost!, $doc: Upload!) {
  pendPost(input: $input, doc: $doc) {
    _id
  }
}
    `;
export type PendPostMutationFn = Apollo.MutationFunction<PendPostMutation, PendPostMutationVariables>;

/**
 * __usePendPostMutation__
 *
 * To run a mutation, you first call `usePendPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePendPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pendPostMutation, { data, loading, error }] = usePendPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      doc: // value for 'doc'
 *   },
 * });
 */
export function usePendPostMutation(baseOptions?: Apollo.MutationHookOptions<PendPostMutation, PendPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PendPostMutation, PendPostMutationVariables>(PendPostDocument, options);
      }
export type PendPostMutationHookResult = ReturnType<typeof usePendPostMutation>;
export type PendPostMutationResult = Apollo.MutationResult<PendPostMutation>;
export type PendPostMutationOptions = Apollo.BaseMutationOptions<PendPostMutation, PendPostMutationVariables>;
export const PendingPostsDocument = gql`
    query pendingPosts {
  pendingPosts {
    _id
    username
    title
    subtitle
    documentURI
    postID
    remarks
    creDttm
    status
    approveUsername
    approveDttm
  }
}
    `;

/**
 * __usePendingPostsQuery__
 *
 * To run a query within a React component, call `usePendingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingPostsQuery(baseOptions?: Apollo.QueryHookOptions<PendingPostsQuery, PendingPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingPostsQuery, PendingPostsQueryVariables>(PendingPostsDocument, options);
      }
export function usePendingPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingPostsQuery, PendingPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingPostsQuery, PendingPostsQueryVariables>(PendingPostsDocument, options);
        }
export type PendingPostsQueryHookResult = ReturnType<typeof usePendingPostsQuery>;
export type PendingPostsLazyQueryHookResult = ReturnType<typeof usePendingPostsLazyQuery>;
export type PendingPostsQueryResult = Apollo.QueryResult<PendingPostsQuery, PendingPostsQueryVariables>;
export const PendingPostsByUsernameDocument = gql`
    query pendingPostsByUsername($username: String) {
  pendingPosts(username: $username) {
    _id
    username
    title
    subtitle
    documentURI
    postID
    remarks
    creDttm
    status
    approveUsername
    approveDttm
  }
}
    `;

/**
 * __usePendingPostsByUsernameQuery__
 *
 * To run a query within a React component, call `usePendingPostsByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingPostsByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingPostsByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePendingPostsByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<PendingPostsByUsernameQuery, PendingPostsByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingPostsByUsernameQuery, PendingPostsByUsernameQueryVariables>(PendingPostsByUsernameDocument, options);
      }
export function usePendingPostsByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingPostsByUsernameQuery, PendingPostsByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingPostsByUsernameQuery, PendingPostsByUsernameQueryVariables>(PendingPostsByUsernameDocument, options);
        }
export type PendingPostsByUsernameQueryHookResult = ReturnType<typeof usePendingPostsByUsernameQuery>;
export type PendingPostsByUsernameLazyQueryHookResult = ReturnType<typeof usePendingPostsByUsernameLazyQuery>;
export type PendingPostsByUsernameQueryResult = Apollo.QueryResult<PendingPostsByUsernameQuery, PendingPostsByUsernameQueryVariables>;
export const PendingPostDocument = gql`
    query pendingPost($oid: String!) {
  pendingPost(oid: $oid) {
    _id
    username
    title
    subtitle
    documentURI
    postID
    remarks
    creDttm
    status
    approveUsername
    approveDttm
  }
}
    `;

/**
 * __usePendingPostQuery__
 *
 * To run a query within a React component, call `usePendingPostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingPostQuery({
 *   variables: {
 *      oid: // value for 'oid'
 *   },
 * });
 */
export function usePendingPostQuery(baseOptions: Apollo.QueryHookOptions<PendingPostQuery, PendingPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingPostQuery, PendingPostQueryVariables>(PendingPostDocument, options);
      }
export function usePendingPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingPostQuery, PendingPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingPostQuery, PendingPostQueryVariables>(PendingPostDocument, options);
        }
export type PendingPostQueryHookResult = ReturnType<typeof usePendingPostQuery>;
export type PendingPostLazyQueryHookResult = ReturnType<typeof usePendingPostLazyQuery>;
export type PendingPostQueryResult = Apollo.QueryResult<PendingPostQuery, PendingPostQueryVariables>;
export const UpdatePendingPostDocument = gql`
    mutation updatePendingPost($input: UpdatePendingPost!, $doc: Upload) {
  updatePendingPost(input: $input, doc: $doc) {
    _id
    title
    subtitle
    postID
    status
    remarks
    approveUsername
    approveDttm
  }
}
    `;
export type UpdatePendingPostMutationFn = Apollo.MutationFunction<UpdatePendingPostMutation, UpdatePendingPostMutationVariables>;

/**
 * __useUpdatePendingPostMutation__
 *
 * To run a mutation, you first call `useUpdatePendingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePendingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePendingPostMutation, { data, loading, error }] = useUpdatePendingPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      doc: // value for 'doc'
 *   },
 * });
 */
export function useUpdatePendingPostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePendingPostMutation, UpdatePendingPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePendingPostMutation, UpdatePendingPostMutationVariables>(UpdatePendingPostDocument, options);
      }
export type UpdatePendingPostMutationHookResult = ReturnType<typeof useUpdatePendingPostMutation>;
export type UpdatePendingPostMutationResult = Apollo.MutationResult<UpdatePendingPostMutation>;
export type UpdatePendingPostMutationOptions = Apollo.BaseMutationOptions<UpdatePendingPostMutation, UpdatePendingPostMutationVariables>;
export const ApprovePostDocument = gql`
    mutation approvePost($input: NewPost!, $image: Upload, $postRefInput: UpdatePendingPost!) {
  approvePost(input: $input, image: $image, postRefInput: $postRefInput) {
    _id
  }
}
    `;
export type ApprovePostMutationFn = Apollo.MutationFunction<ApprovePostMutation, ApprovePostMutationVariables>;

/**
 * __useApprovePostMutation__
 *
 * To run a mutation, you first call `useApprovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApprovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approvePostMutation, { data, loading, error }] = useApprovePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      image: // value for 'image'
 *      postRefInput: // value for 'postRefInput'
 *   },
 * });
 */
export function useApprovePostMutation(baseOptions?: Apollo.MutationHookOptions<ApprovePostMutation, ApprovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApprovePostMutation, ApprovePostMutationVariables>(ApprovePostDocument, options);
      }
export type ApprovePostMutationHookResult = ReturnType<typeof useApprovePostMutation>;
export type ApprovePostMutationResult = Apollo.MutationResult<ApprovePostMutation>;
export type ApprovePostMutationOptions = Apollo.BaseMutationOptions<ApprovePostMutation, ApprovePostMutationVariables>;
export const FavouritePostsDocument = gql`
    query favouritePosts {
  favouritePosts {
    _id
    username
    lupdDttm
    post {
      _id
      title
      subtitle
      user {
        username
        role
        nameC
        titleC
        gender
        profilePicURI
      }
      imageURI
      creDttm
    }
  }
}
    `;

/**
 * __useFavouritePostsQuery__
 *
 * To run a query within a React component, call `useFavouritePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavouritePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavouritePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavouritePostsQuery(baseOptions?: Apollo.QueryHookOptions<FavouritePostsQuery, FavouritePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FavouritePostsQuery, FavouritePostsQueryVariables>(FavouritePostsDocument, options);
      }
export function useFavouritePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavouritePostsQuery, FavouritePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FavouritePostsQuery, FavouritePostsQueryVariables>(FavouritePostsDocument, options);
        }
export type FavouritePostsQueryHookResult = ReturnType<typeof useFavouritePostsQuery>;
export type FavouritePostsLazyQueryHookResult = ReturnType<typeof useFavouritePostsLazyQuery>;
export type FavouritePostsQueryResult = Apollo.QueryResult<FavouritePostsQuery, FavouritePostsQueryVariables>;
export const AddFavouritePostDocument = gql`
    mutation addFavouritePost($input: UpdateFavouritePost!) {
  addFavouritePost(input: $input)
}
    `;
export type AddFavouritePostMutationFn = Apollo.MutationFunction<AddFavouritePostMutation, AddFavouritePostMutationVariables>;

/**
 * __useAddFavouritePostMutation__
 *
 * To run a mutation, you first call `useAddFavouritePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavouritePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavouritePostMutation, { data, loading, error }] = useAddFavouritePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFavouritePostMutation(baseOptions?: Apollo.MutationHookOptions<AddFavouritePostMutation, AddFavouritePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavouritePostMutation, AddFavouritePostMutationVariables>(AddFavouritePostDocument, options);
      }
export type AddFavouritePostMutationHookResult = ReturnType<typeof useAddFavouritePostMutation>;
export type AddFavouritePostMutationResult = Apollo.MutationResult<AddFavouritePostMutation>;
export type AddFavouritePostMutationOptions = Apollo.BaseMutationOptions<AddFavouritePostMutation, AddFavouritePostMutationVariables>;
export const RemoveFavouritePostDocument = gql`
    mutation removeFavouritePost($input: UpdateFavouritePost!) {
  removeFavouritePost(input: $input)
}
    `;
export type RemoveFavouritePostMutationFn = Apollo.MutationFunction<RemoveFavouritePostMutation, RemoveFavouritePostMutationVariables>;

/**
 * __useRemoveFavouritePostMutation__
 *
 * To run a mutation, you first call `useRemoveFavouritePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavouritePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavouritePostMutation, { data, loading, error }] = useRemoveFavouritePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFavouritePostMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFavouritePostMutation, RemoveFavouritePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFavouritePostMutation, RemoveFavouritePostMutationVariables>(RemoveFavouritePostDocument, options);
      }
export type RemoveFavouritePostMutationHookResult = ReturnType<typeof useRemoveFavouritePostMutation>;
export type RemoveFavouritePostMutationResult = Apollo.MutationResult<RemoveFavouritePostMutation>;
export type RemoveFavouritePostMutationOptions = Apollo.BaseMutationOptions<RemoveFavouritePostMutation, RemoveFavouritePostMutationVariables>;
export const ReactDocument = gql`
    mutation react($input: NewReaction!) {
  react(input: $input) {
    _id
    title
    subtitle
    content
    creDttm
    user {
      username
      name
      nameC
      role
      gender
      title
      titleC
      profilePicURI
    }
    reactions {
      username
      type
    }
    comments {
      _id
      title
      subtitle
      content
      creDttm
      user {
        username
        name
        nameC
        role
        gender
        title
        titleC
        profilePicURI
      }
      reactions {
        username
        type
      }
    }
  }
}
    `;
export type ReactMutationFn = Apollo.MutationFunction<ReactMutation, ReactMutationVariables>;

/**
 * __useReactMutation__
 *
 * To run a mutation, you first call `useReactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactMutation, { data, loading, error }] = useReactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReactMutation(baseOptions?: Apollo.MutationHookOptions<ReactMutation, ReactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactMutation, ReactMutationVariables>(ReactDocument, options);
      }
export type ReactMutationHookResult = ReturnType<typeof useReactMutation>;
export type ReactMutationResult = Apollo.MutationResult<ReactMutation>;
export type ReactMutationOptions = Apollo.BaseMutationOptions<ReactMutation, ReactMutationVariables>;
export const UserDocument = gql`
    query user($username: String!) {
  user(username: $username) {
    username
    name
    nameC
    role
    gender
    title
    titleC
    email
    phone
    dob
    profilePicURI
    status
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    username
    name
    nameC
    role
    gender
    title
    titleC
    email
    phone
    dob
    profilePicURI
    status
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserProfilePicUriDocument = gql`
    query userProfilePicURI($username: String!) {
  user(username: $username) {
    profilePicURI
  }
}
    `;

/**
 * __useUserProfilePicUriQuery__
 *
 * To run a query within a React component, call `useUserProfilePicUriQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfilePicUriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfilePicUriQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserProfilePicUriQuery(baseOptions: Apollo.QueryHookOptions<UserProfilePicUriQuery, UserProfilePicUriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfilePicUriQuery, UserProfilePicUriQueryVariables>(UserProfilePicUriDocument, options);
      }
export function useUserProfilePicUriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfilePicUriQuery, UserProfilePicUriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfilePicUriQuery, UserProfilePicUriQueryVariables>(UserProfilePicUriDocument, options);
        }
export type UserProfilePicUriQueryHookResult = ReturnType<typeof useUserProfilePicUriQuery>;
export type UserProfilePicUriLazyQueryHookResult = ReturnType<typeof useUserProfilePicUriLazyQuery>;
export type UserProfilePicUriQueryResult = Apollo.QueryResult<UserProfilePicUriQuery, UserProfilePicUriQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUser!) {
  updateUser(input: $input) {
    username
    name
    nameC
    role
    gender
    title
    titleC
    phone
    email
    profilePicURI
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($input: NewPassword!) {
  changePassword(input: $input)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    token
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: Login!) {
  login(input: $input) {
    token
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const WorshipDocument = gql`
    query worship($worshipId: String!) {
  worship(worshipId: $worshipId) {
    worshipId
    title
    type
    messenger
    note
    verse
    link
    docs {
      title
      link
      type
    }
  }
}
    `;

/**
 * __useWorshipQuery__
 *
 * To run a query within a React component, call `useWorshipQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorshipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorshipQuery({
 *   variables: {
 *      worshipId: // value for 'worshipId'
 *   },
 * });
 */
export function useWorshipQuery(baseOptions: Apollo.QueryHookOptions<WorshipQuery, WorshipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorshipQuery, WorshipQueryVariables>(WorshipDocument, options);
      }
export function useWorshipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorshipQuery, WorshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorshipQuery, WorshipQueryVariables>(WorshipDocument, options);
        }
export type WorshipQueryHookResult = ReturnType<typeof useWorshipQuery>;
export type WorshipLazyQueryHookResult = ReturnType<typeof useWorshipLazyQuery>;
export type WorshipQueryResult = Apollo.QueryResult<WorshipQuery, WorshipQueryVariables>;
export const WorshipsDocument = gql`
    query worships {
  worships {
    worshipId
    title
    type
    messenger
    note
    verse
    link
    docs {
      title
      link
      type
    }
  }
}
    `;

/**
 * __useWorshipsQuery__
 *
 * To run a query within a React component, call `useWorshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorshipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorshipsQuery(baseOptions?: Apollo.QueryHookOptions<WorshipsQuery, WorshipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorshipsQuery, WorshipsQueryVariables>(WorshipsDocument, options);
      }
export function useWorshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorshipsQuery, WorshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorshipsQuery, WorshipsQueryVariables>(WorshipsDocument, options);
        }
export type WorshipsQueryHookResult = ReturnType<typeof useWorshipsQuery>;
export type WorshipsLazyQueryHookResult = ReturnType<typeof useWorshipsLazyQuery>;
export type WorshipsQueryResult = Apollo.QueryResult<WorshipsQuery, WorshipsQueryVariables>;
export const MaxWorshipIdDocument = gql`
    query maxWorshipId {
  maxWorshipId
}
    `;

/**
 * __useMaxWorshipIdQuery__
 *
 * To run a query within a React component, call `useMaxWorshipIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaxWorshipIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaxWorshipIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useMaxWorshipIdQuery(baseOptions?: Apollo.QueryHookOptions<MaxWorshipIdQuery, MaxWorshipIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MaxWorshipIdQuery, MaxWorshipIdQueryVariables>(MaxWorshipIdDocument, options);
      }
export function useMaxWorshipIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MaxWorshipIdQuery, MaxWorshipIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MaxWorshipIdQuery, MaxWorshipIdQueryVariables>(MaxWorshipIdDocument, options);
        }
export type MaxWorshipIdQueryHookResult = ReturnType<typeof useMaxWorshipIdQuery>;
export type MaxWorshipIdLazyQueryHookResult = ReturnType<typeof useMaxWorshipIdLazyQuery>;
export type MaxWorshipIdQueryResult = Apollo.QueryResult<MaxWorshipIdQuery, MaxWorshipIdQueryVariables>;
export const CreateWorshipDocument = gql`
    mutation createWorship($input: NewWorship!, $docs: [NewWorshipDoc]!) {
  createWorship(input: $input, docs: $docs) {
    worshipId
    title
    type
    messenger
    note
    link
    verse
    docs {
      title
      type
      link
    }
  }
}
    `;
export type CreateWorshipMutationFn = Apollo.MutationFunction<CreateWorshipMutation, CreateWorshipMutationVariables>;

/**
 * __useCreateWorshipMutation__
 *
 * To run a mutation, you first call `useCreateWorshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorshipMutation, { data, loading, error }] = useCreateWorshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *      docs: // value for 'docs'
 *   },
 * });
 */
export function useCreateWorshipMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorshipMutation, CreateWorshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorshipMutation, CreateWorshipMutationVariables>(CreateWorshipDocument, options);
      }
export type CreateWorshipMutationHookResult = ReturnType<typeof useCreateWorshipMutation>;
export type CreateWorshipMutationResult = Apollo.MutationResult<CreateWorshipMutation>;
export type CreateWorshipMutationOptions = Apollo.BaseMutationOptions<CreateWorshipMutation, CreateWorshipMutationVariables>;
export const UpdateWorshipDocument = gql`
    mutation updateWorship($input: NewWorship!, $docs: [NewWorshipDoc]!) {
  updateWorship(input: $input, docs: $docs) {
    worshipId
    title
    type
    messenger
    note
    link
    verse
    docs {
      title
      type
      link
    }
  }
}
    `;
export type UpdateWorshipMutationFn = Apollo.MutationFunction<UpdateWorshipMutation, UpdateWorshipMutationVariables>;

/**
 * __useUpdateWorshipMutation__
 *
 * To run a mutation, you first call `useUpdateWorshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorshipMutation, { data, loading, error }] = useUpdateWorshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *      docs: // value for 'docs'
 *   },
 * });
 */
export function useUpdateWorshipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorshipMutation, UpdateWorshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorshipMutation, UpdateWorshipMutationVariables>(UpdateWorshipDocument, options);
      }
export type UpdateWorshipMutationHookResult = ReturnType<typeof useUpdateWorshipMutation>;
export type UpdateWorshipMutationResult = Apollo.MutationResult<UpdateWorshipMutation>;
export type UpdateWorshipMutationOptions = Apollo.BaseMutationOptions<UpdateWorshipMutation, UpdateWorshipMutationVariables>;
export const DeleteWorshipDocument = gql`
    mutation deleteWorship($input: String) {
  deleteWorship(input: $input)
}
    `;
export type DeleteWorshipMutationFn = Apollo.MutationFunction<DeleteWorshipMutation, DeleteWorshipMutationVariables>;

/**
 * __useDeleteWorshipMutation__
 *
 * To run a mutation, you first call `useDeleteWorshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorshipMutation, { data, loading, error }] = useDeleteWorshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteWorshipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorshipMutation, DeleteWorshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorshipMutation, DeleteWorshipMutationVariables>(DeleteWorshipDocument, options);
      }
export type DeleteWorshipMutationHookResult = ReturnType<typeof useDeleteWorshipMutation>;
export type DeleteWorshipMutationResult = Apollo.MutationResult<DeleteWorshipMutation>;
export type DeleteWorshipMutationOptions = Apollo.BaseMutationOptions<DeleteWorshipMutation, DeleteWorshipMutationVariables>;