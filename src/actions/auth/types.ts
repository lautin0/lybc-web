import { SagaResult } from "store/system/types"

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export type User = {
  username: string,
  password: string
}

export interface SignInRequestAction {
    type: typeof SIGN_IN_REQUEST,
    user: User
}

export interface SignInSuccessAction {
    type: typeof SIGN_IN_SUCCESS,
    jwt: string,
    result?: SagaResult
}

export interface SignInFailureAction {
    type: typeof SIGN_IN_FAILURE,
    error: string | null
}

export type SignInActionTypes = SignInRequestAction | SignInSuccessAction | SignInFailureAction