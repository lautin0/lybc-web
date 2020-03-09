
import { combineReducers } from 'redux'
import { default as newComer } from './newComer'
import { default as system } from './system'
import { default as worship } from './worship'

const rootReducer = combineReducers({
  newComer,
  worship,
  system
})

export default function root(state: any, action: any) {
  //if (action.type === ADD_TO_CART && state.products.byId[action.productId].inventory <= 0) return state
  return rootReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>