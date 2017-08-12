import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { connect } from 'ember-redux';
import { getResults, getReviews } from '../../reducers/results';

var stateToComputed = (state) => {
  return {
    results: getResults(state),
    reviews: getReviews(state)
  };
};

var WelpResultsComponent = Ember.Component.extend({
  layout: hbs`
    {{yield results reviews}}
  `
});

export default connect(stateToComputed)(WelpResultsComponent);
