import { take, put, call, fork, all } from 'redux-saga/effects'

import * as actions from '../actions'
import { api } from '../services'
import { MSG_LOGIN_SUCCESS } from './index'

export function* signIn(person: any): Generator<any, any, any> {
    try {
        const payload = yield call(api.signIn, person)
        yield put(actions.signInSuccess(payload.data.login, { message: MSG_LOGIN_SUCCESS, callback: () => { window.location.href = './' } }))
    } catch (error) {
        yield put(actions.signInFailure(error))
    }
}

export function* watchSignIn(): Generator<any, any, any>  {
    while (true) {
        let payload = yield take(actions.SIGN_IN_REQUEST)
        yield call(signIn, payload.user)
    }
}

export default function* authSaga() {
    yield all([
        fork(watchSignIn),
    ])
}