import { AuthState } from "store/auth/types"
import { AuthActionTypes, SIGN_IN_REQUEST, SIGN_IN_FAILURE, SIGN_IN_SUCCESS, SIGN_OUT } from "actions/auth/types"
import { resetClient } from "utils/auth.client"

const initialState: AuthState = {
  user: { username: '', password: '' },
  tokenPair: null,
  isPending: 0
}

export default function authStatus(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        user: action.user,
        isPending: state.isPending + 1
      }
    case SIGN_IN_SUCCESS:

      action.tokenPair.token && localStorage.setItem("token", action.tokenPair.token)
      action.tokenPair.refreshToken && localStorage.setItem("refreshToken", action.tokenPair.refreshToken)

      return {
        ...state,
        tokenPair: action.tokenPair,
        isPending: state.isPending > 0 ? state.isPending - 1 : state.isPending
      }
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isPending: state.isPending > 0 ? state.isPending - 1 : state.isPending
      }
    case SIGN_OUT:

      localStorage.clear();
      resetClient()
      return {
        ...state,
      }
    default:
      return {
        ...state,
        tokenPair: {
          token: localStorage.getItem("token")!,
          refreshToken: localStorage.getItem("refreshToken")!
        }
      }
  }
}