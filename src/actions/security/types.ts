export const SECURITY_TOGGLE_MODAL = "SECURITY_TOGGLE_MODAL"

export interface SecurityToggleModalAction {
  type: typeof SECURITY_TOGGLE_MODAL,
  isShowModal: boolean
}

export type SecurityActionTypes = SecurityToggleModalAction