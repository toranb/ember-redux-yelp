import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';

var stateToComputed = (state) => {
  return {
    results: state.results.all
  };
};

var WelpResultsComponent = Ember.Component.extend({
  layout: hbs`
    {{yield results}}
  `
});

export default connect(stateToComputed)(WelpResultsComponent);
