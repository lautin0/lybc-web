export const SET_SYS_INFO_MESSAGE = "SET_SYS_INFO_MESSAGE"

export interface SetSysInfoMessageAction {
  type: typeof SET_SYS_INFO_MESSAGE,
  message: string
}

export type SysInfoActionTypes = SetSysInfoMessageAction