import { test, module } from 'qunit';
import reducer from 'welp/reducers/results';
import deepFreeze from 'welp/tests/helpers/deep-freeze';

module('Unit | Reducers | results');

test('should return the initial state', function(assert) {
  const result = reducer(undefined, {});

  assert.deepEqual(result, {
    all: undefined,
    selectedId: undefined
  });
});

test('transform should parse fetch response and return new dict data structure', function(assert) {
  const one = {id: 1, name: 'one'};
  const two = {id: 2, name: 'two'};
  const three = {id: 3, name: 'three'};

  const result = reducer({}, {type: 'TRANSFORM_LIST', response: [one, two, three]});

  assert.deepEqual(result, {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': 'two'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  });
});

test('transform should truly merge without side effecting the previous state', function(assert) {
  let previous = {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': '2'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  };

  deepFreeze(previous);

  const result = reducer(previous, {type: 'TRANSFORM_LIST', response: [{id: 2, name: 'two'}, {id: 3, name: 'three'}]});

  assert.deepEqual(result, {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': 'two'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  });
});

test('detail should parse fetch response set selectedId and merge payload', function(assert) {
  let previous = {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': '2'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  };

  deepFreeze(previous);

  const result = reducer(previous, {type: 'TRANSFORM_DETAIL', response: {id: 2, name: 'two'}});

  assert.deepEqual(result, {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': 'two'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    },
    selectedId: 2
  });
});

test('rate should parse fetch response and merge payload with new rating', function(assert) {
  let previous = {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': '2'
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  };

  deepFreeze(previous);

  const result = reducer(previous, {type: 'RATE_ITEM', response: {id: 2, name: 'two', reviews: [{id: 9, rating: 3, comment: 'decent'}]}});

  assert.deepEqual(result, {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': 'two',
        'reviews': [
          {id: 9, rating: 3, comment: 'decent'}
        ]
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  });
});

test('comment should parse fetch response and merge payload with new comment', function(assert) {
  let previous = {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': '2',
        'reviews': [
          {id: 9, rating: 3}
        ]
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  };

  deepFreeze(previous);

  const result = reducer(previous, {type: 'COMMENT_ITEM', response: {id: 2, name: 'two', reviews: [{id: 9, rating: 3, comment: 'decent'}]}});

  assert.deepEqual(result, {
    all: {
      '1': {
        'id': 1,
        'name': 'one'
      },
      '2': {
        'id': 2,
        'name': 'two',
        'reviews': [
          {id: 9, rating: 3, comment: 'decent'}
        ]
      },
      '3': {
        'id': 3,
        'name': 'three'
      }
    }
  });
});
