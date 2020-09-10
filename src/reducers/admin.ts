import { combineReducers } from 'redux'
import { AdminState } from 'store/admin/types'
import { AdminActionTypes, SET_FORM } from 'actions/admin/types'

const initialState: AdminState = {
  formInstance: null
}

function form(
  state = initialState,
  action: AdminActionTypes
): AdminState {
  switch (action.type) {
    case SET_FORM:
      return {
        formInstance: action.form,
      }
    default:
      return state
  }
}

export default combineReducers({
  form
});