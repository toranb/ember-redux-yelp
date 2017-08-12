import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helper:comment', 'Integration | Helper | comment', {
  integration: true
});

test('renders empty string when both result and reviews undefined', function(assert) {
  this.render(hbs`{{comment}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders empty string when both result and reviews are empty object', function(assert) {
  this.set('result', {});
  this.set('reviews', {});
  this.render(hbs`{{comment result reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders empty string when reviews is empty object', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: []
  });
  this.set('reviews', {});
  this.render(hbs`{{comment result reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('returns the first comment if not specified', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 4, comment: 'first'
    },
    2: {
      id: 2, rating: 4, comment: 'last'
    }
  });
  this.render(hbs`{{comment result reviews}}`);
  assert.equal(this.$().text().trim(), 'first');
});

test('when index passed as 3rd argument the correct comment is shown', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 4, comment: 'first'
    },
    2: {
      id: 2, rating: 4, comment: 'last'
    }
  });
  this.render(hbs`{{comment result reviews 1}}`);
  assert.equal(this.$().text().trim(), 'last');
});

test('renders empty string when index out of range', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 4, comment: 'first'
    }
  });
  this.render(hbs`{{comment result reviews 1}}`);
  assert.equal(this.$().text().trim(), '');
});
