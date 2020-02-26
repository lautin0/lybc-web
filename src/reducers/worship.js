import { combineReducers } from 'redux'
import {
    SET_IMAGE
} from '../actions'

const initialState = {
    dataUrl: null
}

function image(state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE:
            return {
                dataUrl: action.dataUrl,
            }
        default:
            return state
    }
}

export default combineReducers({
    image
});