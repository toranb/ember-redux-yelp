import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';

var stateToComputed = (state) => {
  return {
    authenticated: state.login.authenticated
  };
};

var dispatchToActions = (dispatch) => {
  return {
    logout: () => dispatch({type: 'LOGOUT_USER'})
  };
};

var WelpLayoutComponent = Ember.Component.extend({
    layout: hbs`
      {{yield authenticated (action "logout")}}
    `
});

export default connect(stateToComputed, dispatchToActions)(WelpLayoutComponent);
