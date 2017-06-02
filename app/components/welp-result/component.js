import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { connect } from 'ember-redux';
import { getSelectedResult } from '../../reducers/results';
import { rate, comment } from '../../actions/results';

var stateToComputed = (state) => {
  return {
    result: getSelectedResult(state)
  };
};

var dispatchToActions = {
  rate,
  comment
};

var WelpResultComponent = Ember.Component.extend({
  layout: hbs`
    {{yield result (action "rate") (action "comment")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpResultComponent);
