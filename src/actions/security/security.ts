import { SecurityActionTypes, SECURITY_TOGGLE_MODAL } from "./types";

export function toggleSecurityModal(isShowModal: boolean): SecurityActionTypes {
  return {
    type: SECURITY_TOGGLE_MODAL,
    isShowModal
  }
}