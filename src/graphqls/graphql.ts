import { gql } from "@apollo/client";

export type LoginInput = {
  username: string,
  password: string
}

export type RefreshTokenInput = {
  token: string | null
}

export const LOGIN = gql`
  mutation login($input: Login!){
    login(input: $input){
      token
      refreshToken
    }
  }
`

export const ADD_WORSHIP = gql`
  mutation createWorship($input: NewWorship!, $docs: [NewWorshipDoc]!){
    createWorship(input: $input, docs: $docs){
      worshipId,
      title
      type,
      messenger,
      note,
      link,
      verse
      docs {
        title
        type
        link
      }
    }
  }
`

export const UPDATE_WORSHIP = gql`
  mutation updateWorship($input: NewWorship!, $docs: [NewWorshipDoc]!){
    updateWorship(input: $input, docs: $docs){
      worshipId,
      title
      type,
      messenger,
      note,
      link,
      verse
      docs {
        title
        type
        link
      }
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refresh($input: RefreshTokenInput!){
    refreshToken(input: $input){
      token
      refreshToken
    }
  }
`

export const GET_WORSHIP = gql`
  query GetWorship($worshipId: String!){
    worship(worshipId: $worshipId){
      worshipId
      title
      type
      messenger
      note
      verse
      link
      docs{
        title
        link
        type
      }
    }
  }
`

export const GET_WORSHIPS = gql`
  query {
    worships{
      worshipId
      title
      type
      messenger
      note
      verse
      link
      docs{
        title
        link
        type
      }
    }
  }
`

export const DELETE_WORSHIP = gql`
  mutation deleteWorship($input: String){
    deleteWorship(input: $input)  
}
`

export const GET_MAX_WORSHIP_ID = gql`
  query {
    maxWorshipId
  }
`

export const GET_POSTS = gql`
  query {
    posts{
      _id
      title
      subtitle      
      creDttm
      type
      imageURI
      parantId
      isFavourited
      user{
        username
        name
        nameC
        role
        gender
        title
        titleC
      }
    }
  }
`

export const GET_POST = gql`
  query getPostByOID($oid: String!){
    post(oid: $oid){
      _id
      title
      subtitle
      content
      creDttm
      imageURI
      user{
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
        user{
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
`

export const ADD_POST = gql`
  mutation createPost($input: NewPost!, $image: Upload){
    createPost(input: $input, image: $image){
      _id
      title
      subtitle
      content
      creDttm
      user{
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
        user{
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
`

export const REACT_TO_POST = gql`
  mutation react($input: NewReaction!){
    react(input: $input){
      _id
      title
      subtitle
      content
      creDttm
      user{
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
        user{
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
  }`

export const GET_NOTIFICATIONS = gql`
  query getNotifications($toUsername: String!) {
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
`

export const READ_NOTIFICATIONS = gql`
  mutation readNotification($input: String!){
    readNotification(input: $input){
      _id
    }
  }
`
export const GET_USER = gql`
  query getUser($username: String!){
    user(username: $username){
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
    }
  }
`

export const GET_USER_PROFILE_PIC_URI = gql`
  query getUser($username: String!){
    user(username: $username){
      profilePicURI
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUser!){
    updateUser(input: $input){
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
`

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: NewPassword!){
    changePassword(input: $input) 
  }
`

export const ADD_NAMECARD = gql`
  mutation createNameCard($input: NewNameCard!){
    createNameCard(input: $input){
      _id,
      name,
      email,
      phone,
      gender,
    }
  }
`

export const GET_NAMECARDS = gql`
  query {
    nameCards{
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
`

export const PEND_POST = gql`
  mutation pendPost($input: NewPendingPost!, $doc: Upload!) {
    pendPost(input: $input, doc: $doc){
      _id
    }
  }
`
export const GET_PENDING_POSTS = gql`
  query {
    pendingPosts{
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
`

export const GET_PENDING_POSTS_BY_USERNAME = gql`
  query pendingPosts($username: String){
    pendingPosts(username: $username){
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
`

export const GET_PENDING_POST = gql`
  query getPendingPostByOID($oid: String!){
    pendingPost(oid: $oid){
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
`

export const UPDATE_PENDING_POST = gql`
  mutation updatePendingPost($input: UpdatePendingPost!, $doc: Upload){
    updatePendingPost(input: $input, doc: $doc){
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
`


export const APPROVE_POST = gql`
  mutation approvePost($input: NewPost!, $image: Upload, $postRefInput: UpdatePendingPost!){
    approvePost(input: $input, image: $image, postRefInput: $postRefInput){
      _id
    }
  }
`

export const GET_FAVOURITE_POST = gql`
  query favouritePosts{
    favouritePosts{
      _id
      username
      lupdDttm
      post {
        _id
        title
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
`

export const ADD_FAV_POST = gql`
  mutation addFavouritePost($input: UpdateFavouritePost!){
    addFavouritePost(input: $input)
  }
`

export const REMOVE_FAV_POST = gql`
  mutation removeFavouritePost($input: UpdateFavouritePost!){
    removeFavouritePost(input: $input)
  }
`