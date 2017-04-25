import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import { getSelectedResult } from '../../reducers/results';

var stateToComputed = (state) => {
  return {
    result: getSelectedResult(state)
  };
};

var dispatchToActions = (dispatch) => {
  return {
    rate: (id, rating) => {
      dispatch({
        type: 'RATE_ITEM',
        payload: {
          id: id,
          rating: rating
        },
        meta: {
          offline: {
            effect: { url: `/api/results/${id}`, method: 'POST', body: JSON.stringify({rating: rating}) },
            commit: { type: 'RATE_ITEM_COMMIT', meta: {id: id, rating: rating} },
            rollback: { type: 'RATE_ITEM_ROLLBACK', meta: {id: id, rating: rating} }
          }
        }
      })
    },
    comment: (id, reviewId, comment) => {
      dispatch({
        type: 'COMMENT_ITEM',
        payload: {
          id: id,
          comment: comment,
          reviewId: reviewId
        },
        meta: {
          offline: {
            effect: { url: `/api/results/${id}`, method: 'PUT', body: JSON.stringify({comment: comment}) },
            commit: { type: 'COMMENT_ITEM_COMMIT', meta: {id: id, reviewId: reviewId, comment: comment} },
            rollback: { type: 'COMMENT_ITEM_ROLLBACK', meta: {id: id, reviewId: reviewId, comment: comment} }
          }
        }
      })
    }
  };
};

var WelpResultComponent = Ember.Component.extend({
  layout: hbs`
    {{yield result (action "rate") (action "comment")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpResultComponent);
