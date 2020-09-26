export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SAGA_RESULT = 'RESET_SAGA_RESULT'
export const SET_LOADING = 'SET_LOADING'
export const SET_SYSTEM_FAILURE = 'SET_SYSTEM_FAILURE'
export const SET_SYSTEM_MESSAGE = 'SET_SYSTEM_MESSAGE'

export interface ResetSystemErrorAction {
    type: typeof RESET_SYSTEM_ERROR,
    error: string | null
}

export interface ResetSagaResultAction {
    type: typeof RESET_SAGA_RESULT,
    result: any
}

export interface SetLoadingAction {
    type: typeof SET_LOADING,
    isLoading: boolean
}

export interface SetSystemFailureAction {
    type: typeof SET_SYSTEM_FAILURE,
    error: any
}

export type SystemActionTypes = ResetSystemErrorAction | ResetSagaResultAction | 
    SetLoadingAction | SetSystemFailureAction