import { SystemActionTypes, RESET_SYSTEM_ERROR, SET_LOADING, RESET_SAGA_RESULT, SET_SYSTEM_FAILURE } from './system/types'

export function resetSysError(): SystemActionTypes{
    return {
        type: RESET_SYSTEM_ERROR,
        error: null
    }
}

export function resetSysMessage(): SystemActionTypes{
    return {
        type: RESET_SAGA_RESULT,
        result: null
    }
}

export function setLoading(isLoading: boolean): SystemActionTypes{
    return {
        type: SET_LOADING,
        isLoading
    }
}

export function setSystemFailure(error: any): SystemActionTypes{
    return {
        type: SET_SYSTEM_FAILURE,
        error
    }
}

export function setSysMessage(message: string): SystemActionTypes{
    return {
        type: RESET_SAGA_RESULT,
        result: { message: message }
    }
}

export * from './worship/worship'
export * from './worship/types'
export * from './sys-info/sysInfo'
export * from './sys-info/types'