import fetch from 'fetch';
import route from 'ember-redux/route';

var model = (dispatch, options) => {
  return fetch(`/api/results/${options.index}`)
    .then(fetched => fetched.json())
    .then(response => dispatch({
      type: 'TRANSFORM_DETAIL',
      response: response.result
    }));
};

export default route({model})();
