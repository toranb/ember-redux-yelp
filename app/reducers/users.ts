import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { ImmutableObject } from 'seamless-immutable';

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

const initialState = Immutable<UserState>({
  all: undefined,
  authenticatedId: undefined
});

type ImmutableState<T> = ImmutableObject<T> & T;

export default ((state: ImmutableState<UserState>, action: Action): ImmutableState<UserState> => {
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
