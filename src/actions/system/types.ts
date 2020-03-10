export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SYS_MESSAGE = 'RESET_SYS_MESSAGE'
export const SET_LOADING = 'SET_LOADING'

export interface ResetSystemErrorAction {
    type: typeof RESET_SYSTEM_ERROR,
    error: string | null
}

export interface ResetSystemMessageAction {
    type: typeof RESET_SYS_MESSAGE,
    message: string | null
}

export interface SetLoadingAction {
    type: typeof SET_LOADING,
    isLoading: boolean
}

export type SystemActionTypes = ResetSystemErrorAction | ResetSystemMessageAction | SetLoadingAction