import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import _ from 'npm:lodash';

var stateToComputed = (state) => {
  return {
    result: _.get(state.results.all, state.results.selectedId)
  };
};

var WelpResultComponent = Ember.Component.extend({
  layout: hbs`
    {{yield result}}
  `
});

export default connect(stateToComputed)(WelpResultComponent);
