import { fork, all } from 'redux-saga/effects'

import {default as newComerSaga} from './newComerSaga'
import {default as authSaga} from './authSaga'

export const MSG_OPERATION_SUCCESS = '操作成功'
export const MSG_LOGIN_SUCCESS = '登入成功'
export const MSG_UPDATE_SUCCESS = '更新成功'
export const MSG_SAVE_SUCCESS = '儲存成功'

export default function* root() {
  yield all([
    fork(newComerSaga),
    fork(authSaga)
  ])
}