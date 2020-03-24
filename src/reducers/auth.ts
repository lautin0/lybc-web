import { AuthState } from "store/auth/types"
import { SignInActionTypes, SIGN_IN_REQUEST, SIGN_IN_FAILURE, SIGN_IN_SUCCESS } from "actions/auth/types"

const initialState: AuthState = {
  user: { username: '', password: ''},
  jwt: null,
  isPending: 0
}

export default function authStatus(
  state = initialState, 
  action: SignInActionTypes
): AuthState {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        user: action.user,
        isPending: state.isPending + 1
      }
    case SIGN_IN_SUCCESS:
      sessionStorage.setItem("jwt", action.jwt)
      return {
        ...state,
        jwt: action.jwt,
        isPending: state.isPending - 1
      }
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isPending: state.isPending - 1
      }
    default:
      return { 
        ...state,
        jwt: sessionStorage.getItem("jwt")
      }
  }
}