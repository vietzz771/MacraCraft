/* eslint-disable indent */
import {
  ADD_ORDER, CANCEL_ORDER
} from '@/constants/constants';
import { displayActionMessage } from '@/helpers/utils';
import {
  all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { history } from '@/routers/AppRouter';
import firebase from '@/services/firebase';
import {
  addProductSuccess,
  clearSearchState, editProductSuccess, getProductsSuccess,
  removeProductSuccess,
  searchProductSuccess
} from '../actions/productActions';

function* initRequest() {
  yield put(setLoading(true));
  yield put(setRequestStatus(null));
}

function* handleError(e) {
  yield put(setLoading(false));
  yield put(setRequestStatus(e?.message || 'Failed to fetch products'));
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* orderSaga({ type, payload }) {
  console.log(payload);
  switch (type) {
    case ADD_ORDER: {
      try {
        yield initRequest();
        yield call(firebase.addOrder, payload);
        yield put(setLoading(false));
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, `Item failed to add: ${e?.message}`, 'error');
      }
      break;
    }
    case CANCEL_ORDER: {
      try {
        console.log(payload);
        yield put(setLoading(false));
        yield call(firebase.cancelOrder, payload);
        yield put(setLoading(false));
        yield call(displayActionMessage, 'Order Cancelled Successfully!', 'success');
      } catch (e) {
        console.log(e.message);
      }
      break;
    }
    default: {
      throw new Error(`Unexpected action type ${type}`);
    }
  }
}

export default orderSaga;
