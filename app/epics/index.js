import { combineEpics } from 'redux-observable';
import { rate, comment } from 'welp/epics/results';

export default combineEpics(
  rate,
  comment
);
