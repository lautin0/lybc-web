import { SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE } from '../actions'

const initialState = {
  isPending: 0,
  error: null,
  person: { name: '', phone: '', email: ''},
}

export default function saveNewComerStatus(state = initialState, action) {
  switch (action.type) {
    case SAVE_NEWCOMER_REQUEST:
      return {
        ...state,
        isPending: state.isPending + 1,
        error: null,
      }
    case SAVE_NEWCOMER_SUCCESS:
      return {
        person: initialState.person,
        isPending: state.isPending - 1,
        error: null,
      }
      case SAVE_NEWCOMER_FAILURE:
        return {
          person: action.person,
          isPending: state.isPending - 1,
          error: action.error,
        }
    default:
      return state
  }
}