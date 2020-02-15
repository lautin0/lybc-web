import { RESET_SYSTEM_ERROR, RESET_SYS_MESSAGE } from '../actions'

const initialState = {
  error: null,
  message: null
}

export default function system(state = initialState, action) {
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
  } else {
    return state
  }
}