import { combineReducers } from 'redux'
import {
  SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE,
  FETCH_NEWCOMER_REQUEST, FETCH_NEWCOMER_SUCCESS, FETCH_NEWCOMER_FAILURE
} from '../actions'

const initialState = {
  saveState: {
    isPending: 0,
    person: { name: '', phone: '', email: '' },
  },
  fetchState: {
    newComers: [],
    isFetching: false,
  }
}

function saveStatus(state = initialState.saveState, action) {
  switch (action.type) {
    case SAVE_NEWCOMER_REQUEST:
      return {
        person: action.person,
        isPending: state.isPending + 1,
      }
    case SAVE_NEWCOMER_SUCCESS:
      return {
        ...initialState.saveState,
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

function fetchStatus(state = initialState.fetchState, action) {
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