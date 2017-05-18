import _ from 'lodash';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  all: undefined,
  authenticatedId: undefined
});

export default ((state, action) => {
  switch(action.type) {
    case 'ASSIGN_USER': {
      const user = {[action.user.id]: action.user};
      const merge = _.extend({}, state.all, user);
      return state.merge({all: merge, authenticatedId: action.user.id});
    }
    default: {
      return state || initialState;
    }
  }
});
