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
  theme: Ember.inject.service(),
  themeName: Ember.computed.alias('theme.activeThemeName'),
  layout: hbs`
    {{yield authenticated themeName (action "logout")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpLayoutComponent);
