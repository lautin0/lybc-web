import { combineReducers } from 'redux'
import { NewComerSaveState, NewComerFetchState } from '../store/new-comer/types'
import { 
  NewComerActionTypes, 
  SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE, 
  FETCH_NEWCOMER_REQUEST, FETCH_NEWCOMER_SUCCESS, FETCH_NEWCOMER_FAILURE 
} from 'actions/new-comer/types'

const initialSaveState: NewComerSaveState = {
  isPending: 0,
  person: { name: '', phone: '', email: '' },
}

const initialFetchState: NewComerFetchState = {
  newComers: [],
  isFetching: false,
}

function saveStatus(
    state = initialSaveState, 
    action: NewComerActionTypes
  ): NewComerSaveState {
  switch (action.type) {
    case SAVE_NEWCOMER_REQUEST:
      return {
        person: action.person,
        isPending: state.isPending + 1,
      }
    case SAVE_NEWCOMER_SUCCESS:
      return {
        ...initialSaveState,
        isPending: state.isPending - 1,
      }
    case SAVE_NEWCOMER_FAILURE:
      return {
        person: action.person,
        isPending: state.isPending - 1,
      }
    default:
      return state
  }
}

function fetchStatus(
    state = initialFetchState, 
    action: NewComerActionTypes
  ): NewComerFetchState {
  switch (action.type) {
    case FETCH_NEWCOMER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_NEWCOMER_SUCCESS:
      return {
        ...state,
        newComers: [...state.newComers, ...action.newComers],
        isFetching: false
      }
    case FETCH_NEWCOMER_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default combineReducers({
  fetchStatus,
  saveStatus
});