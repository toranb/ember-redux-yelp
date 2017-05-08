import 'rxjs/Rx';

const rate = (action$, _, { ajax }) => {
  return action$.ofType('RATE_ITEM_EPIC')
    .mergeMap(action =>
      ajax({method: 'POST', url: `/api/results/${action.payload.id}`, body: JSON.stringify({rating: action.payload.rating})})
      .map(payload => ({ type: 'RATE_ITEM', payload }))
    );
}

const comment = (action$, _, { ajax }) => {
  return action$.ofType('COMMENT_ITEM_EPIC')
    .mergeMap(action =>
      ajax({method: 'PUT', url: `/api/results/${action.payload.id}`, body: JSON.stringify({comment: action.payload.comment})})
      .map(payload => ({ type: 'COMMENT_ITEM', payload }))
    );
}

export { rate, comment };
