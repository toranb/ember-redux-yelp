import { spawn } from 'redux-saga/effects';
import { login } from 'welp/sagas/theme';
import { rate, comment } from 'welp/sagas/results';

export default function* root() {
  yield [
    spawn(rate),
    spawn(comment),
    spawn(login)
  ];
}
