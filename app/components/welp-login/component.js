import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import { getActiveThemeName } from '../../reducers/theme';

var stateToComputed = (state) => {
  return {
    username: state.login.username,
    themeName: getActiveThemeName(state)
  };
};

var dispatchToActions = function(dispatch) {
  return {
    login: (username) => {
      let themeName = this.get('themeName');
      dispatch({type: 'LOGIN_ASYNC', payload: {username: username, themeName: themeName}});
    }
  };
};

var WelpLoginComponent = Ember.Component.extend({
  layout: hbs`
    {{yield username (action "login")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpLoginComponent);
