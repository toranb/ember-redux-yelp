import { test, module } from 'qunit';
import { getSelectedResult, getSelectedReviews } from 'welp/reducers/results';
import deepFreeze from 'welp/tests/helpers/deep-freeze';

module('Unit | Selectors | results');

test('getSelectedReviews should transform userId on nested review to boolean value', function(assert) {
  const state = {
    users: {
      authenticatedId: 39
    },
    results: {
      selectedId: 2,
      all: {
        1: {
          id: 1,
          name: 'one',
          reviews: [7, 8]
        },
        2: {
          id: 2,
          name: 'two',
          reviews: [5, 6]
        },
        3: {
          id: 3,
          name: 'three',
          reviews: []
        }
      },
      reviews: {
        5: {
          id: 5,
          rating: 3,
          comment: 'xyz',
          userId: 39
        },
        6: {
          id: 6,
          rating: 2,
          comment: 'keep',
          userId: 32
        },
        7: {
          id: 7,
          userId: 33
        },
        8: {
          id: 8,
          userId: 31
        }
      }
    }
  };

  deepFreeze(state);

  const selectionResult = getSelectedResult(state);

  const expectedResult = {
    id: 2,
    name: 'two',
    reviews: [5, 6]
  };

  assert.deepEqual(selectionResult, expectedResult);

  const selectionReviews = getSelectedReviews(state);

  const expectedReviews = {
    5: {
        id: 5,
        rating: 3,
        comment: 'xyz',
        reviewed: true,
        userId: 39
    },
    6: {
        id: 6,
        rating: 2,
        comment: 'keep',
        reviewed: false,
        userId: 32
    }
  };

  assert.deepEqual(selectionReviews, expectedReviews);
});
