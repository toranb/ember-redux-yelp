import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import { getResults } from '../../reducers/results';

var stateToComputed = (state) => {
  return {
    results: getResults(state)
  };
};

var WelpResultsComponent = Ember.Component.extend({
  layout: hbs`
    {{yield results}}
  `
});

export default connect(stateToComputed)(WelpResultsComponent);
