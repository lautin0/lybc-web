import { RESET_SYSTEM_ERROR, RESET_SYS_MESSAGE, SET_LOADING } from '../actions'
import { SystemState } from '../store/system/types'

const initialState: SystemState = {
  error: null,
  message: null,
  loading: 0
}

export default function system(state = initialState, action: any) {
  if (action.type.includes('FAILURE')) {
    return {
      ...state,
      error: action.error
    }
  } else if (action.type.includes('SUCCESS')) {
    return {
      ...state,
      message: action.message
    }
  } else if (action.type === RESET_SYSTEM_ERROR) {
    return {
      ...state,
      error: null
    }
  } else if (action.type === RESET_SYS_MESSAGE) {
    return {
      ...state,
      message: null
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