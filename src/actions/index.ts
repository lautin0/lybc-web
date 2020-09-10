import { SystemActionTypes, RESET_SYSTEM_ERROR, SET_LOADING, RESET_SAGA_RESULT } from './system/types'

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

export * from './new-comer/newComer'
export * from './new-comer/types'
export * from './worship/worship'
export * from './worship/types'
export * from './auth/auth'
export * from './auth/types'
export * from './admin/types'