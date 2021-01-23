import { SET_SYS_INFO_MESSAGE, SysInfoActionTypes } from "actions";
import { SysInfoState } from "store/sys-info/types";

const initState: SysInfoState = {
  message: ''
}

function sysInfo(
  state = initState,
  action: SysInfoActionTypes
): SysInfoState {
  switch (action.type) {
    case SET_SYS_INFO_MESSAGE:
      return {
        message: action.message
      }

    default:
      return state
  }
}

export default sysInfo;