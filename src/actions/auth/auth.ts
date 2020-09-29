import { AuthActionTypes, User, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, TokenPair, SignOutAction, SIGN_OUT } from "./types"
import { SagaResult } from "store/system/types"

export function signIn(user: User): AuthActionTypes {
  return {
      type: SIGN_IN_REQUEST,
      user
  }
}

export function signInSuccess(tokenPair: TokenPair, result?: SagaResult): AuthActionTypes {
  return {
      type: SIGN_IN_SUCCESS,      
      tokenPair,
      result
  }
}

export function signInFailure(error: any): AuthActionTypes {
  return {
      type: SIGN_IN_FAILURE,
      error
  }
}

export function signOut(): SignOutAction {
  return {
    type: SIGN_OUT
  }
}