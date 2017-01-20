import Ember from 'ember';
import fetch from 'fetch';
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
    rate: (id, rating) => fetch(`/api/results/${id}`, {method: 'POST', body: JSON.stringify({rating: rating})}).then(fetched => fetched.json()).then((response) => dispatch({type: 'RATE_ITEM', response: response.result})),
    comment: (id, comment) => fetch(`/api/results/${id}`, {method: 'PUT', body: JSON.stringify({comment: comment})}).then(fetched => fetched.json()).then((response) => dispatch({type: 'COMMENT_ITEM', response: response.result}))
  };
};

var WelpResultComponent = Ember.Component.extend({
  layout: hbs`
    {{yield result (action "rate") (action "comment")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpResultComponent);
