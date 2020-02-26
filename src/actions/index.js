export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SYS_MESSAGE = 'RESET_SYS_MESSAGE'


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

export * from './newComer'
export * from './shop'
export * from './worship'