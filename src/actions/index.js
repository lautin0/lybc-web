export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'

export const SAVE_NEWCOMER_REQUEST = 'SAVE_NEWCOMER_REQUEST'
export const SAVE_NEWCOMER_SUCCESS = 'SAVE_NEWCOMER_SUCCESS'
export const SAVE_NEWCOMER_FAILURE = 'SAVE_NEWCOMER_FAILURE'

export const FETCH_NEWCOMER_REQUEST = 'FETCH_NEWCOMER_REQUEST'
export const FETCH_NEWCOMER_SUCCESS = 'FETCH_NEWCOMER_SUCCESS'
export const FETCH_NEWCOMER_FAILURE = 'FETCH_NEWCOMER_FAILURE'

export const RESET_SYSTEM_ERROR = 'RESET_SYSTEM_ERROR'
export const RESET_SYS_MESSAGE = 'RESET_SYS_MESSAGE'

export function getAllProducts() {
    return {
        type: GET_ALL_PRODUCTS,
    }
}

export function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products: products,
    }
}

export function addToCart(productId) {
    return {
        type: ADD_TO_CART,
        productId,
    }
}

export function removeFromCart(productId) {
    return {
        type: REMOVE_FROM_CART,
        productId,
    }
}

export function checkout() {
    return {
        type: CHECKOUT_REQUEST,
    }
}

export function checkoutSuccess(cart) {
    return {
        type: CHECKOUT_SUCCESS,
        cart,
    }
}

export function checkoutFailure(error) {
    return {
        type: CHECKOUT_FAILURE,
        error,
    }
}

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