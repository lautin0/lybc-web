import { gql } from "@apollo/client";

export type LoginInput = { 
  username: string, 
  password: string 
}

export type RefreshTokenInput = { 
  token: string | null
}
export type NewWorshipInput = {
  worshipId: string,
  type: string,
  title: string,
  note: string,
  verse: string,
  link: string,
  messenger: string,
}

export type NewWorshipDocInput = {
  title: string,
  link: string,
  type: string
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
}`

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
}`

export const DELETE_WORSHIP = gql`
  mutation deleteWorship($input: String){
    deleteWorship(input: $input)  
}
`

export const GET_MAX_WORSHIP_ID = gql`
query {
  maxWorshipId
}`

export const GET_POSTS =  gql`
query {
  posts{
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
      }
      reactions {
        username
        type
      }
    }
  }
}`

export const GET_POST =  gql`
query getPostByOID($oid: String!){
  post(oid: $oid){
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
      }
      reactions {
        username
        type
      }
    }
  }
}`

export const ADD_POST = gql`
  mutation createPost($input: NewPost!){
    createPost(input: $input){
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
        }
        reactions {
          username
          type
        }
      }
    }
  }
`

export const GET_NOTIFICATIONS = gql`
  query getNotifications($toUsername: String!) {
    notifications(toUsername: $toUsername) {
      _id
      toUsername
      fromUsername
      type
      param
      isRead
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