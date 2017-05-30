import _ from 'lodash';
import * as SI from 'seamless-immutable';

const Immutable = SI['default'] ? SI['default'] : SI;

const initialState = Immutable({
  all: undefined,
  authenticatedId: undefined
});

interface User {
  id: number;
  name: string;
}

interface Action {
  type: string;
  user: User;
}

interface UserState {
  all: Array<User>;
  authenticatedId: number;
}

export default ((state: SI.ImmutableObject<UserState>, action: Action): SI.ImmutableObject<UserState> => {
  switch(action.type) {
    case 'ASSIGN_USER': {
      const user = {[action.user.id]: action.user};
      return state.merge({all: user, authenticatedId: action.user.id});
    }
    default: {
      return state || initialState;
    }
  }
});
