import { SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE } from '../actions'

const initialState = {
  saveNewComerStatus: {
    savePending: false,
    error: null,
  },
  quantityById: {},
}

export default function saveNewComerStatus(state = initialState.saveNewComerStatus, action) {
  switch (action.type) {
    case SAVE_NEWCOMER_REQUEST:
      return {
        savePending: true,
        error: null,
      }
    case SAVE_NEWCOMER_SUCCESS:
      return initialState.saveNewComerStatus
    case SAVE_NEWCOMER_FAILURE:
      return {
        savePending: false,
        error: action.error,
      }
    default:
      return state
  }
}