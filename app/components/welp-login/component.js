import Ember from 'ember';
import fetch from 'fetch';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';

var stateToComputed = (state) => {
  return {
    username: state.login.username
  };
};

var dispatchToActions = function(dispatch) {
  return {
    login: (username) => fetch(`/api/login`, {method: 'POST', body: JSON.stringify({username: username})})
      .then(fetched => fetched.json())
      .then((response) => {
        dispatch({type: 'LOGIN_USER', response: response});
        let service = this.get('theme');
        service.updateTheme(response);
      })
  };
};

var WelpLoginComponent = Ember.Component.extend({
  theme: Ember.inject.service(),
  layout: hbs`
    {{yield username (action "login")}}
  `
});

export default connect(stateToComputed, dispatchToActions)(WelpLoginComponent);
