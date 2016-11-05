import _ from 'npm:lodash';

const initialState = {
  all: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'TRANSFORM_LIST':
      const results = _.keyBy(action.response, (result) => result.id);
      const merged = _.extend({}, state.all, results);
      return Object.assign({}, state, {all: merged});
    default:
      return state || initialState;
  }
});
