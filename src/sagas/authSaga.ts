import { take, put, call, fork, all } from 'redux-saga/effects'

import * as actions from '../actions'
import { api } from '../services'
import { MSG_SAVE_SUCCESS } from './index'

export function* signIn(person: any) {
    try {
        const { jwt } = yield call(api.signIn, person)
        yield put(actions.signInSuccess(jwt, MSG_SAVE_SUCCESS))
    } catch (error) {
        yield put(actions.signInFailure(error))
    }
}

export function* watchSignIn() {
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