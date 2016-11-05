import fetch from 'fetch';
import route from 'ember-redux/route';

var model = (dispatch) => {
  return fetch('/api/results')
    .then(fetched => fetched.json())
    .then(response => dispatch({
      type: 'TRANSFORM_LIST',
      response: response.results
    }));
};

export default route({model})();
