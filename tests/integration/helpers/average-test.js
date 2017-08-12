import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helper:average', 'Integration | Helper | average', {
  integration: true
});

test('renders empty string when both result and reviews undefined', function(assert) {
  this.render(hbs`{{average}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders empty string when result and reviews are both empty object', function(assert) {
  this.set('result', {});
  this.set('reviews', {});
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders empty string when reviews is empty object', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: []
  });
  this.set('reviews', {});
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders 4 stars with 2 reviews that sum 8 total', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 4
    },
    2: {
      id: 2, rating: 4
    }
  });
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★');
});

test('renders 3 stars with 3 reviews that sum 9 total', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2, 3]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 1
    },
    2: {
      id: 2, rating: 6
    },
    3: {
      id: 3, rating: 2
    }
  });
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '★★★');
});

test('renders 3 stars with 2 reviews that sum 6 total', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 1
    },
    2: {
      id: 2, rating: 5
    }
  });
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '★★★');
});

test('renders 5 stars with 1 review that equals 5', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 5
    }
  });
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★★');
});

test('renders 4.5 stars with 2 reviews that sum 9 total', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [1, 2]
  });
  this.set('reviews', {
    1: {
      id: 1, rating: 4
    },
    2: {
      id: 2, rating: 5
    }
  });
  this.render(hbs`{{average result reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★½');
});
