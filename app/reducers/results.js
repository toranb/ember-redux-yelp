import _ from 'lodash';
import reselect from 'reselect';
import { normalize, denormalize, schema } from 'normalizr';
import Immutable from 'seamless-immutable';

const review = new schema.Entity('reviews');
const resultsSchema = new schema.Entity('results', {
  reviews: [review]
});

const { createSelector } = reselect;

const initialState = Immutable({
  all: undefined,
  reviews: undefined,
  selectedId: undefined
});

export default ((state, action) => {
  switch(action.type) {
    case 'TRANSFORM_LIST': {
      const normalized = normalize(action.response, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      const resultz = _.keyBy(results, result => result.id);
      const reviewz = _.keyBy(reviews, review => review.id);
      const mergedResults = _.extend({}, state.all, resultz);
      const mergedReviews = _.extend({}, state.reviews, reviewz);
      return state.merge({all: mergedResults, reviews: mergedReviews});
    }
    case 'TRANSFORM_DETAIL': {
      const result = {[action.response.id]: action.response};
      const normalized = normalize(result, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      const merge = _.extend({}, state.all, results);
      const mergeReviews = _.extend({}, state.reviews, _.keyBy(reviews, review => review.id));
      return state.merge({all: merge, reviews: mergeReviews, selectedId: action.response.id});
    }
    case 'RATE_ITEM':
    case 'COMMENT_ITEM': {
      const rateResult = {[action.response.id]: action.response};
      const normalized = normalize(rateResult, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      const rateMerge = _.extend({}, state.all, results);
      const rateReviews = _.extend({}, state.reviews, _.keyBy(reviews, review => review.id));
      return state.merge({all: rateMerge, reviews: rateReviews});
    }
    default: {
      return state || initialState;
    }
  }
});

const results = state => state.results.all;
const reviews = state => state.results.reviews;
const selectedId = state => state.results.selectedId;
const authenticatedUserId = state => state.users.authenticatedId;

export const getResults = createSelector(
  results,
  reviews,
  (results, reviews) => {
    return _.map(results, result => {
      var denormalized = denormalize({reviews: result.reviews}, resultsSchema, {reviews: reviews});
      return _.defaults({
        reviews: denormalized.reviews
      }, result);
    });
  }
);

export const getSelectedResult = createSelector(
  results,
  reviews,
  selectedId,
  authenticatedUserId,
  (results, reviews, selectedId, authenticatedUserId) => {
    return _.map([results[selectedId]], result => {
      const theReviews = _.mapValues(reviews, review => {
        return _.defaults({
          reviewed: review.userId === authenticatedUserId
        }, review);
      });

      const denormalized = denormalize({reviews: result.reviews}, resultsSchema, {reviews: theReviews});
      return _.defaults({
        reviews: denormalized.reviews
      }, result);
    })[0];
  }
);
