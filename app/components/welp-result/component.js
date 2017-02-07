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
    rate: (id, rating) => dispatch({type: 'RATE_ITEM_ASYNC', payload: {id: id, rating: rating}}),
    comment: (id, comment) => dispatch({type: 'COMMENT_ITEM_ASYNC', payload: {id: id, comment: comment}})
  };
};

var WelpResultComponent = Ember.Component.extend({
  layout: hbs`
    {{yield result (action "rate") (action "comment")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpResultComponent);
