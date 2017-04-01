import fetch from 'fetch';
import { call, put, takeLatest } from 'redux-saga/effects';

function* rateAsync(action) {
  const id = action.payload.id;
  const rating = action.payload.rating;
  const fetched = yield call(fetch, `/api/results/${id}`, {method: 'POST', body: JSON.stringify({rating: rating})});
  const response = yield call(f => f.json(), fetched);
  yield put({type: 'RATE_ITEM', response: response.result});
}

export function* rate() {
  yield takeLatest('RATE_ITEM_ASYNC', rateAsync);
}

function* commentAsync(action) {
  const id = action.payload.id;
  const comment = action.payload.comment;
  const fetched = yield call(fetch, `/api/results/${id}`, {method: 'PUT', body: JSON.stringify({comment: comment})});
  const response = yield call(f => f.json(), fetched);
  yield put({type: 'COMMENT_ITEM', response: response.result});
}

export function* comment() {
  yield takeLatest('COMMENT_ITEM_ASYNC', commentAsync);
}
