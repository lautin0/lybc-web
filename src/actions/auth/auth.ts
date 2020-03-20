import { SignInActionTypes, User, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./types"

export function signIn(user: User): SignInActionTypes {
  return {
      type: SIGN_IN_REQUEST,
      user
  }
}

export function signInSuccess(jwt: string, message: string): SignInActionTypes {
  return {
      type: SIGN_IN_SUCCESS,      
      jwt,
      message
  }
}

export function signInFailure(error: any): SignInActionTypes {
  return {
      type: SIGN_IN_FAILURE,
      error
  }
}