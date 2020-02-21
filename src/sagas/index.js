import { fork, all } from 'redux-saga/effects'

import {default as newComerSaga} from './newComerSaga'
import {default as shopSaga} from './shopSaga'


export const MSG_SAVE_SUCCESS = '操作成功'
export const MSG_UPDATE_SUCCESS = '更新成功'

export default function* root() {
  yield all([
    fork(newComerSaga),
    fork(shopSaga)
  ])
}