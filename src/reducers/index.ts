
import { combineReducers } from 'redux'
import { default as newComer } from './newComer'
import { default as system } from './system'
import { default as worship } from './worship'
import { default as auth } from './auth'
import { default as admin } from './admin'
import { default as security } from './security'

const rootReducer = combineReducers({
  newComer,
  worship,
  auth,
  system,
  admin,
  security
})

export default function root(state: any, action: any) {
  return rootReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>