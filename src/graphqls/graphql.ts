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