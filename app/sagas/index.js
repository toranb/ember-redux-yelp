import { fork } from 'redux-saga/effects';
import { rate, comment } from 'welp/sagas/results';

export default function* root() {
  yield [
    fork(rate),
    fork(comment)
  ];
}
