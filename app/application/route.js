import Ember from 'ember';
import { route } from 'ember-redux';

var beforeModel = (dispatch) => {
  var user = Ember.$('[preload-user]').data('configuration');
  dispatch({
    type: 'ASSIGN_USER',
    user: user
  });
};

export default route({beforeModel})();
