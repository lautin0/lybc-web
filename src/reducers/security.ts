import { SecurityActionTypes, SECURITY_TOGGLE_MODAL } from "actions/security/types"
import { SecurityState } from "store/security/types"

const initialState: SecurityState = {
  isShowModal: false,
}

export default function authStatus(
  state = initialState,
  action: SecurityActionTypes
): SecurityState {
  switch (action.type) {
    case SECURITY_TOGGLE_MODAL:
      return {
        isShowModal: action.isShowModal
      }
    default:
      return initialState
  }
}