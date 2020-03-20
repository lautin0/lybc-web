
import { combineReducers } from 'redux'
import { default as newComer } from './newComer'
import { default as system } from './system'
import { default as worship } from './worship'
import { default as auth } from './auth'

const rootReducer = combineReducers({
  newComer,
  worship,
  auth,
  system
})

export default function root(state: any, action: any) {
  return rootReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>