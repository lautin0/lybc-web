import { take, put, call, fork, takeLeading, all } from 'redux-saga/effects'

import * as actions from '../actions'
import { api } from '../services'
import { MSG_OPERATION_SUCCESS, MSG_UPDATE_SUCCESS } from './index'

export function* fetchNewComers(action: any) {
    const { pageSize, page } = action;
    try {
        const results = yield call(api.fetchNewComers, pageSize, page)
        yield put(actions.fetchNewComersSuccess(results.data))
    } catch (error) {
        yield put(actions.fetchNewComersFailure(error))
    }
}

export function* saveNewComer(person: any) {
    try {
        yield call(api.saveNewComer, person)
        yield put(actions.saveNewComerSuccess({ message: MSG_OPERATION_SUCCESS }))
    } catch (error) {
        yield put(actions.saveNewComerFailure(person, error))
    }
}

export function* watchSaveNewComer() {
    while (true) {
        let payload = yield take(actions.SAVE_NEWCOMER_REQUEST)
        yield call(saveNewComer, payload.person)
    }
}

export function* watchfetchNewComer() {
    yield takeLeading(actions.FETCH_NEWCOMER_REQUEST, fetchNewComers)
}

export default function* newComerSaga() {
    yield all([
        fork(watchSaveNewComer),
        fork(watchfetchNewComer)
    ])
}