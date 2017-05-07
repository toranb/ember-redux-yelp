import Rx from 'rxjs/Rx';
import fetch from 'fetch';

const dispatchRate = payload => ({ type: 'RATE_ITEM', payload });

const rate = action$ =>
  action$.ofType('RATE_ITEM_EPIC')
    .flatMap(action => Rx.Observable.fromPromise(fetch(`/api/results/${action.payload.id}`, {method: 'POST', body: JSON.stringify({rating: action.payload.rating})})))
    .flatMap(f => Rx.Observable.fromPromise(f.json()))
    .map(response => dispatchRate(response))

const dispatchComment = payload => ({ type: 'COMMENT_ITEM', payload });

const comment = action$ =>
  action$.ofType('COMMENT_ITEM_EPIC')
    .flatMap(action => Rx.Observable.fromPromise(fetch(`/api/results/${action.payload.id}`, {method: 'PUT', body: JSON.stringify({comment: action.payload.comment})})))
    .flatMap(f => Rx.Observable.fromPromise(f.json()))
    .map(response => dispatchComment(response))

export { rate, comment };
