import _ from 'lodash';
import Ember from 'ember';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  all: undefined,
  selectedId: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'TRANSFORM_LIST': {
      const results = _.keyBy(action.response, (result) => result.id);
      const merged = _.extend({}, state.all, results);
      return Object.assign({}, state, {all: merged});
    }
    case 'TRANSFORM_DETAIL': {
      const result = {[action.response.id]: action.response};
      const merge = _.extend({}, state.all, result);
      return Object.assign({}, state, {
        all: merge,
        selectedId: action.response.id
      });
    }
    case 'COMMENT_ITEM': {
      let reviewId = action.payload.reviewId;
      let newComment = action.payload.comment;
      let result = state.all[action.payload.id];
      let reviews = result.reviews.map(review => {
        return _.defaults({
          comment: review.id === reviewId ? newComment : review.comment
        }, review);
      });
      const rateResult = Object.assign({}, result, {reviews: reviews});
      const rateMerge = _.extend({}, state.all, {[rateResult.id]: rateResult});
      return Object.assign({}, state, {
        all: rateMerge
      });
    }
    case 'COMMENT_ITEM_COMMIT': {
      let userId = 39;
      let reviewz = action.payload.result.reviews;
      let rateResult = _.map([state.all[action.payload.result.id]], result => {
        var reviews = result.reviews.map(review => {
          return _.defaults({
            comment: review.userId === userId ? reviewz.filter((r) => { return r.userId === userId; })[0].comment : review.comment
          }, review);
        });
        return _.defaults({
          reviews: reviews
        }, result);
      })[0];
      const rateMerge = _.extend({}, state.all, {[action.payload.result.id]: rateResult});
      return Object.assign({}, state, {
        all: rateMerge
      });
    }
    case 'RATE_ITEM': {
      let userId = 39;
      let reviewId = action.payload.id;
      let newRating = action.payload.rating;
      let result = state.all[reviewId];
      let reviewed = result.reviews.filter((review) => {
        return review.userId === userId ? review : undefined;
      })[0];

      var reviews;
      if (reviewed) {
        reviews = result.reviews.map(review => {
          return _.defaults({
            rating: review.id === reviewed.id ? newRating : review.rating
          }, review);
        });
      }else{
        let uuid = Ember.uuid();
        reviews = result.reviews.concat([{id: uuid, rating: newRating, userId: userId, comment: ''}]);
      }

      const rateResult = Object.assign({}, result, {reviews: reviews});
      const rateMerge = _.extend({}, state.all, {[reviewId]: rateResult});
      return Object.assign({}, state, {
        all: rateMerge
      });
    }
    case 'RATE_ITEM_COMMIT': {
      let userId = 39;
      let reviewId = action.payload.result.id;
      let reviewz = action.payload.result.reviews;
      let rateResult = _.map([state.all[reviewId]], result => {
        var reviews = result.reviews.map(review => {
          return _.defaults({
            id: review.userId === userId ? reviewz.filter((r) => { return r.userId === userId; })[0].id : review.id
          }, review);
        });
        return _.defaults({
          reviews: reviews
        }, result);
      })[0];

      const rateMerge = _.extend({}, state.all, {[reviewId]: rateResult});
      return Object.assign({}, state, {
        all: rateMerge
      });
    }
    default: {
      return state || initialState;
    }
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
