import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  all: undefined,
  selectedId: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'TRANSFORM_LIST':
      const results = _.keyBy(action.response, (result) => result.id);
      const merged = _.extend({}, state.all, results);
      return Object.assign({}, state, {all: merged});
    case 'TRANSFORM_DETAIL':
      const result = {[action.response.id]: action.response};
      const merge = _.extend({}, state.all, result);
      return Object.assign({}, state, {
        all: merge,
        selectedId: action.response.id
      });
    case 'RATE_ITEM':
    case 'COMMENT_ITEM':
      const rateResult = {[action.response.id]: action.response};
      const rateMerge = _.extend({}, state.all, rateResult);
      return Object.assign({}, state, {
        all: rateMerge
      });
    default:
      return state || initialState;
  }
});

const results = state => state.results.all;
const selectedId = state => state.results.selectedId;
const authenticatedUserId = state => state.users.authenticatedId;

export const getResults = (state) => {
  return results(state);
};

export const getSelectedResult = createSelector(
  results,
  selectedId,
  authenticatedUserId,
  (results, selectedId, authenticatedUserId) => {
    return _.map([results[selectedId]], result => {
      var reviews = result.reviews.map(review => {
        return _.defaults({
          reviewed: review.userId === authenticatedUserId
        }, review);
      });
      return _.defaults({
        reviews: reviews
      }, result);
    })[0];
  }
);
