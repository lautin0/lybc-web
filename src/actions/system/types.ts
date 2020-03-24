export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SAGA_RESULT = 'RESET_SAGA_RESULT'
export const SET_LOADING = 'SET_LOADING'

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

export type SystemActionTypes = ResetSystemErrorAction | ResetSagaResultAction | SetLoadingAction