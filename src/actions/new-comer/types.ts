export const SAVE_NEWCOMER_REQUEST = 'SAVE_NEWCOMER_REQUEST'
export const SAVE_NEWCOMER_SUCCESS = 'SAVE_NEWCOMER_SUCCESS'
export const SAVE_NEWCOMER_FAILURE = 'SAVE_NEWCOMER_FAILURE'

export const FETCH_NEWCOMER_REQUEST = 'FETCH_NEWCOMER_REQUEST'
export const FETCH_NEWCOMER_SUCCESS = 'FETCH_NEWCOMER_SUCCESS'
export const FETCH_NEWCOMER_FAILURE = 'FETCH_NEWCOMER_FAILURE'

export type Person = {
    name: string, 
    phone: string, 
    email: string
}

export interface FetchNewComersRequestAction {
    type: typeof FETCH_NEWCOMER_REQUEST,
    pageSize: number,
    page: number
}

export interface FetchNewComersSuccessAction {
    type: typeof FETCH_NEWCOMER_SUCCESS,
    newComers: Array<Person>
}

export interface FetchNewComersFailureAction {
    type: typeof FETCH_NEWCOMER_FAILURE,
    error: any
}

export interface SaveNewComerRequestAction {
    type: typeof SAVE_NEWCOMER_REQUEST,
    person: Person
}

export interface SaveNewComerSuccessAction {
    type: typeof SAVE_NEWCOMER_SUCCESS,
    message: any
}

export interface SaveNewComerFailureAction {
    type: typeof SAVE_NEWCOMER_FAILURE,
    person: Person,
    error: any
}

export type NewComerActionTypes = FetchNewComersRequestAction | FetchNewComersSuccessAction | FetchNewComersFailureAction | 
                                SaveNewComerRequestAction | SaveNewComerSuccessAction | SaveNewComerFailureAction