import reselect from 'reselect';
import { normalize, schema } from 'normalizr';

const review = new schema.Entity('reviews');
const resultsSchema = new schema.Entity('results', {
  reviews: [review]
});

const { createSelector } = reselect;

const initialState = {
  all: undefined,
  reviews: undefined,
  selectedId: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'TRANSFORM_LIST': {
      const normalized = normalize(action.response, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...results},
        reviews: {...state.reviews, ...reviews}
      }
    }
    case 'TRANSFORM_DETAIL': {
      const result = {[action.response.id]: action.response};
      const normalized = normalize(result, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...results},
        reviews: {...state.reviews, ...reviews},
        selectedId: action.response.id
      }
    }
    case 'RATE_ITEM':
    case 'COMMENT_ITEM': {
      const rateResult = {[action.response.id]: action.response};
      const normalized = normalize(rateResult, [resultsSchema]);
      const { results, reviews } = normalized.entities;
      return {
        ...state,
        all: {...state.all, ...results},
        reviews: {...state.reviews, ...reviews}
      }
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
  (results) => results
);

export const getReviews = createSelector(
  reviews,
  (reviews) => reviews
);

export const getSelectedResult = createSelector(
  results,
  selectedId,
  (results, selectedId) => results[selectedId]
);

export const getSelectedReviews = createSelector(
  reviews,
  getSelectedResult,
  authenticatedUserId,
  (reviews, selectedResult, userId) => {
    return selectedResult.reviews.reduce((prev, id) => {
      let review = reviews[id];
      return {...prev, ...{[id]: {...review, reviewed: review.userId === userId}}};
    }, {});
  }
);
