import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import { getActiveThemeName } from '../../reducers/theme';

var stateToComputed = (state) => {
  return {
    authenticated: state.login.authenticated,
    themeName: getActiveThemeName(state)
  };
};

var dispatchToActions = (dispatch) => {
  return {
    logout: () => dispatch({type: 'LOGOUT_USER'})
  };
};

var WelpLayoutComponent = Ember.Component.extend({
  layout: hbs`
    {{yield authenticated themeName (action "logout")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpLayoutComponent);
