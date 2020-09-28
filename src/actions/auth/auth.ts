import { SignInActionTypes, User, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, TokenPair } from "./types"
import { SagaResult } from "store/system/types"

export function signIn(user: User): SignInActionTypes {
  return {
      type: SIGN_IN_REQUEST,
      user
  }
}

export function signInSuccess(tokenPair: TokenPair, result?: SagaResult): SignInActionTypes {
  return {
      type: SIGN_IN_SUCCESS,      
      tokenPair,
      result
  }
}

export function signInFailure(error: any): SignInActionTypes {
  return {
      type: SIGN_IN_FAILURE,
      error
  }
}