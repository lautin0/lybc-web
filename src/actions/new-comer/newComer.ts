import { 
    NewComerActionTypes, Person, 
    FETCH_NEWCOMER_SUCCESS, FETCH_NEWCOMER_FAILURE, FETCH_NEWCOMER_REQUEST,
    SAVE_NEWCOMER_REQUEST, SAVE_NEWCOMER_SUCCESS, SAVE_NEWCOMER_FAILURE 
} from "./types"


export function fetchNewComers(pageSize: number, page: number): NewComerActionTypes {
    return {
        type: FETCH_NEWCOMER_REQUEST,
        pageSize,
        page
    }
}

export function fetchNewComersSuccess(newComers: Array<Person>): NewComerActionTypes {
    return {
        type: FETCH_NEWCOMER_SUCCESS,
        newComers
    }
}

export function fetchNewComersFailure(error: any): NewComerActionTypes {
    return {
        type: FETCH_NEWCOMER_FAILURE,
        error
    }
}

export function saveNewComer(person: Person): NewComerActionTypes {
    return {
        type: SAVE_NEWCOMER_REQUEST,
        person
    }
}

export function saveNewComerSuccess(message: string): NewComerActionTypes {
    return {
        type: SAVE_NEWCOMER_SUCCESS,
        message
    }
}

export function saveNewComerFailure(person: Person, error: any): NewComerActionTypes {
    return {
        type: SAVE_NEWCOMER_FAILURE,
        person,
        error
    }
}