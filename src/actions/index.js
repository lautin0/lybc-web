export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SYS_MESSAGE = 'RESET_SYS_MESSAGE'
export const SET_LOADING = 'SET_LOADING'


export function resetSysError(){
    return {
        type: RESET_SYSTEM_ERROR,
    }
}

export function resetSysMessage(){
    return {
        type: RESET_SYS_MESSAGE,
    }
}

export function setLoading(isLoading){
    return {
        type: SET_LOADING,
        isLoading
    }
}

export * from './newComer'
export * from './shop'
export * from './worship'