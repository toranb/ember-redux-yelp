import { test, module } from 'qunit';
import reducer from 'welp/reducers/users';
import deepFreeze from 'welp/tests/helpers/deep-freeze';

module('Unit | Reducers | users');

test('should return the initial state', function(assert) {
  const result = reducer(undefined, {});

  assert.deepEqual(result, {
    all: undefined,
    authenticatedId: undefined
  });
});

test('transform should parse user and return new dict data structure', function(assert) {
  const user = {id: 39, name: 'Toran'};

  const result = reducer({}, {type: 'ASSIGN_USER', user: user});

  assert.deepEqual(result, {
    all: {
      '39': {
        'id': 39,
        'name': 'Toran'
      }
    },
    authenticatedId: 39
  });
});

test('transform should merge new user information w/out side effecting previous', function(assert) {
  let previous = {
    all: {
      '39': {
        'id': 39,
        'name': 'Toran'
      }
    },
    authenticatedId: 39
  };

  deepFreeze(previous);

  const result = reducer(previous, {type: 'ASSIGN_USER', user: {id: 39, name: 'Wat'}});

  assert.deepEqual(result, {
    all: {
      '39': {
        'id': 39,
        'name': 'Wat'
      }
    },
    authenticatedId: 39
  });
});
