import thunk from 'redux-thunk';
import { freeze } from 'ember-redux-freeze';
import config from '../config/environment';

let middleware = [thunk];

if (config !== 'production') {
  middleware.push(freeze);
}

export default middleware;
