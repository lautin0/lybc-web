import { SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE } from '../actions'

const initialState = {
  isPending: 0,
  person: { name: '', phone: '', email: ''},
}

export default function saveNewComerStatus(state = initialState, action) {
  switch (action.type) {
    case SAVE_NEWCOMER_REQUEST:
      return {
        person: action.person,
        isPending: state.isPending + 1,
      }
    case SAVE_NEWCOMER_SUCCESS:
      return {
        ...initialState,
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