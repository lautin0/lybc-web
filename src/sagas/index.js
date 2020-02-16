import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as actions from '../actions'
import { getCart } from '../reducers'
import { api } from '../services'

export const MSG_SAVE_SUCCESS = '操作成功'
export const MSG_UPDATE_SUCCESS = '更新成功'

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
  try {
    const cart = yield select(getCart)
    yield call(api.buyProducts, cart)
    yield put(actions.checkoutSuccess(cart))
  } catch (error) {
    yield put(actions.checkoutFailure(error))
  }
}

export function* fetchNewComers(pageSize, page) {
  try {
    const results = yield call(api.fetchNewComers, pageSize, page)
    yield put(actions.fetchNewComersSuccess(results.data))
  } catch (error) {
    yield put(actions.fetchNewComersFailure(error))
  }
}

export function* saveNewComer(person) {
    try {
      yield call(api.saveNewComer, person)
      yield put(actions.saveNewComerSuccess(MSG_SAVE_SUCCESS))
    } catch (error) {
      yield put(actions.saveNewComerFailure(person, error))
    }
  }

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
  */
  yield takeEvery(actions.GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while (true) {
    yield take(actions.CHECKOUT_REQUEST)
    /*
      ***THIS IS A BLOCKING CALL***
      It means that watchCheckout will ignore any CHECKOUT_REQUEST event until
      the current checkout completes, either by success or by Error.
      i.e. concurrent CHECKOUT_REQUEST are not allowed
      TODO: This needs to be enforced by the UI (disable checkout button)
    */
    yield call(checkout)
  }
}

export function* watchSaveNewComer() {
  while(true){
    let payload = yield take(actions.SAVE_NEWCOMER_REQUEST)
    yield call(saveNewComer, payload.person)
  }
}

export function* watchfetchNewComer() {
  while(true){
    let payload = yield take(actions.FETCH_NEWCOMER_REQUEST)
    yield call(fetchNewComers, payload.pageSize, payload.page)
  }
}

export default function* root() {
  yield all([
      fork(getAllProducts), 
      fork(watchGetProducts), 
      fork(watchCheckout),
      fork(watchSaveNewComer),
      fork(watchfetchNewComer)
    ])
}