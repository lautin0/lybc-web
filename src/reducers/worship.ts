import { combineReducers } from 'redux'
import {
    SET_IMAGE
} from '../actions'
import { WorshipState } from '../store/worship/types'

const initialState: WorshipState = {
    dataUrl: null
}

function image(state = initialState, action: any) {
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