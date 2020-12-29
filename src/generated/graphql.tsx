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
  createPost: Post;
  createTodo: Todo;
  createUser: User;
  createWorship: Worship;
  deleteWorship: Scalars['Int'];
  login: TokenPair;
  react: Post;
  readNotification: Notification;
  refreshToken: TokenPair;
  updateWorship: Worship;
};


export type MutationCreatePostArgs = {
  input: NewPost;
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


export type MutationReactArgs = {
  input: NewReaction;
};


export type MutationReadNotificationArgs = {
  input: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  input?: Maybe<RefreshTokenInput>;
};


export type MutationUpdateWorshipArgs = {
  input: NewWorship;
  docs: Array<Maybe<NewWorshipDoc>>;
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
  PostApproval = 'POST_APPROVAL'
}

export type Query = {
  __typename?: 'Query';
  maxWorshipId: Scalars['Int'];
  notifications: Array<Maybe<Notification>>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  todos: Array<Todo>;
  user?: Maybe<User>;
  users: Array<User>;
  worship?: Maybe<Worship>;
  worships: Array<Worship>;
};


export type QueryNotificationsArgs = {
  toUsername: Scalars['String'];
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



export type Post = {
  __typename?: 'Post';
  _id: Scalars['ObjectID'];
  parantId?: Maybe<Scalars['ObjectID']>;
  comments: Array<Maybe<Post>>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  type: PostType;
  content: Scalars['String'];
  username: Scalars['String'];
  user: User;
  creDttm: Scalars['Time'];
  reactions: Array<Maybe<Reaction>>;
};

export type NewPost = {
  parantId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  type: PostType;
  content: Scalars['String'];
  username: Scalars['String'];
  toUsername?: Maybe<Scalars['String']>;
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

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export enum Role {
  Admin = 'ADMIN',
  Worker = 'WORKER',
  Member = 'MEMBER',
  Public = 'PUBLIC'
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
  dob: Scalars['Time'];
  gender: Gender;
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
  dob: Scalars['String'];
  gender: Gender;
  creBy: Scalars['String'];
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
