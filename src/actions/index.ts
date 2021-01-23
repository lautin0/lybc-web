import { SystemActionTypes, RESET_SYSTEM_ERROR, SET_LOADING, RESET_SAGA_RESULT, SET_SYSTEM_FAILURE, DECISION_REQUEST, DECISION_COMPLETE } from './system/types'

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

export function decisionRequest(message: string, positiveAction?: any, negativeAction?: any): SystemActionTypes{
    return {
        type: DECISION_REQUEST,
        message,
        positiveAction,
        negativeAction
    }
}

export function decisionComplete(): SystemActionTypes{
    return {
        type: DECISION_COMPLETE,
    }
}

export * from './new-comer/newComer'
export * from './new-comer/types'
export * from './worship/worship'
export * from './worship/types'
export * from './auth/auth'
export * from './auth/types'
export * from './admin/types'
export * from './sys-info/sysInfo'
export * from './sys-info/types'