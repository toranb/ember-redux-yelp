import { test, module } from 'qunit';
import { getSelectedResult } from 'welp/reducers/results';
import deepFreeze from 'welp/tests/helpers/deep-freeze';

module('Unit | Selectors | results');

test('getSelectedResult should transform userId on nested review to boolean value', function(assert) {
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
          reviews: [
            {
              id: 7,
              userId: 33
            },
            {
              id: 8,
              userId: 31
            }]
        },
        2: {
          id: 2,
          name: 'two',
          reviews: [
            {
              id: 6,
              rating: 2,
              comment: 'keep',
              userId: 32
            },
            {
              id: 5,
              rating: 3,
              comment: 'xyz',
              userId: 39
            }]
        },
        3: {
          id: 3,
          name: 'three',
          reviews: []
        }
      }
    }
  };

  deepFreeze(state);

  const selection = getSelectedResult(state);

  const expectedSelection = {
    id: 2,
    name: 'two',
    reviews: [
      {
        id: 6,
        rating: 2,
        comment: 'keep',
        reviewed: false,
        userId: 32
      },
      {
        id: 5,
        rating: 3,
        comment: 'xyz',
        reviewed: true,
        userId: 39
      }]
  };

  assert.deepEqual(selection, expectedSelection);
});
