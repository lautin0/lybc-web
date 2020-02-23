export const SAVE_NEWCOMER_REQUEST = 'SAVE_NEWCOMER_REQUEST'
export const SAVE_NEWCOMER_SUCCESS = 'SAVE_NEWCOMER_SUCCESS'
export const SAVE_NEWCOMER_FAILURE = 'SAVE_NEWCOMER_FAILURE'

export const FETCH_NEWCOMER_REQUEST = 'FETCH_NEWCOMER_REQUEST'
export const FETCH_NEWCOMER_SUCCESS = 'FETCH_NEWCOMER_SUCCESS'
export const FETCH_NEWCOMER_FAILURE = 'FETCH_NEWCOMER_FAILURE'

export function fetchNewComers(pageSize, page) {
    return {
        type: FETCH_NEWCOMER_REQUEST,
        pageSize,
        page
    }
}

export function fetchNewComersSuccess(newComers) {
    return {
        type: FETCH_NEWCOMER_SUCCESS,
        newComers
    }
}

export function fetchNewComersFailure(error) {
    return {
        type: FETCH_NEWCOMER_FAILURE,
        error
    }
}

export function saveNewComer(person) {
    return {
        type: SAVE_NEWCOMER_REQUEST,
        person
    }
}

export function saveNewComerSuccess(message) {
    return {
        type: SAVE_NEWCOMER_SUCCESS,
        message
    }
}

export function saveNewComerFailure(person, error) {
    return {
        type: SAVE_NEWCOMER_FAILURE,
        person,
        error
    }
}