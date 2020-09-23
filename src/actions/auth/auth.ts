import { SignInActionTypes, User, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./types"
import { SagaResult } from "store/system/types"

export function signIn(user: User): SignInActionTypes {
  return {
      type: SIGN_IN_REQUEST,
      user
  }
}

export function signInSuccess(jwt: string, result?: SagaResult): SignInActionTypes {
  return {
      type: SIGN_IN_SUCCESS,      
      jwt,
      result
  }
}

export function signInFailure(error: any): SignInActionTypes {
  return {
      type: SIGN_IN_FAILURE,
      error
  }
}