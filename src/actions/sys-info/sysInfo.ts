import { SET_SYS_INFO_MESSAGE, SysInfoActionTypes } from "./types";

export function SetSysInfoMessage(message: string): SysInfoActionTypes {
  return {
    type: SET_SYS_INFO_MESSAGE,
    message
  }
}