import { combineReducers } from 'redux';
import users from 'welp/reducers/users';
import results from 'welp/reducers/results';

export default combineReducers({
  users: users,
  results: results
});
