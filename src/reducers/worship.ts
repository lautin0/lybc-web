import { combineReducers } from 'redux'
import { WorshipState } from '../store/worship/types'
import { WorshipActionTypes, SET_IMAGE } from 'actions/worship/types'

const initialState: WorshipState = {
  dataUrl: null
}

function image(
  state = initialState,
  action: WorshipActionTypes
): WorshipState {
  switch (action.type) {
    case SET_IMAGE:
      return {
        dataUrl: action.dataUrl,
      }
    default:
      return state
  }
}

export default combineReducers({
  image
});