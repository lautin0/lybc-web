import { combineReducers } from 'redux'
import { DecisionState, SystemState } from '../store/system/types'
import { RESET_SYSTEM_ERROR, RESET_SAGA_RESULT, SET_LOADING, DECISION_REQUEST, SystemActionTypes, DECISION_COMPLETE } from 'actions/system/types'

const initialState: SystemState = {
  error: null,
  result: null,
  loading: 0
}

const extractError = (e: any) => {
  if (e.response != null) {
    switch (e.response.status) {

      case 404:
      case 405:
        return "網絡錯誤"

      case 403:
        if (e.response.data !== "")
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

function general(
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
      result: action.result
    }
  } else if (action.type === RESET_SYSTEM_ERROR) {
    return {
      ...state,
      error: action.error
    }
  } else if (action.type === RESET_SAGA_RESULT) {
    return {
      ...state,
      result: action.result
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

const initialDecisionState: DecisionState = {
  isPending: false,
  message: null
}

function decision(
  state = initialDecisionState,
  action: SystemActionTypes): DecisionState {
  switch (action.type) {
    case DECISION_REQUEST:
      return {
        ...state,
        isPending: true,
        message: action.message,
        positiveAction: action.positiveAction,
        negativeAction: action.negativeAction
      }
    case DECISION_COMPLETE:
      return initialDecisionState;
    default:
      return state;
  }
}

export default combineReducers({
  general,
  decision
});