import { SystemState } from '../store/system/types'
import { RESET_SYSTEM_ERROR, RESET_SYS_MESSAGE, SET_LOADING } from 'actions/system/types'

const initialState: SystemState = {
  error: null,
  message: null,
  loading: 0
}

const extractError = (e: any) => {
  if (e.response != null) {
    switch (e.response.status) {

      case 404:
      case 405:
      case 403:
        return "網絡錯誤"

      case 401:
        if (e.response.data != "")
          return e.response.data;
        else
          return "沒有權限";

      default:
        return e;

    }

  } else {
    return e;
  }
}

export default function system(
  state = initialState,
  action: any
): SystemState {
  if (action.type.includes('FAILURE')) {
    return {
      ...state,
      error: extractError(action.error)
    }
  } else if (action.type.includes('SUCCESS')) {
    return {
      ...state,
      message: action.message
    }
  } else if (action.type === RESET_SYSTEM_ERROR) {
    return {
      ...state,
      error: action.error
    }
  } else if (action.type === RESET_SYS_MESSAGE) {
    return {
      ...state,
      message: action.message
    }
  } else if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: state.loading + (action.isLoading ? 1 : -1)
    }
  } else {
    return state
  }
}