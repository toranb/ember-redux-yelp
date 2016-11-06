import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helper:reviewed', 'Integration | Helper | reviewed', {
  integration: true
});

test('should return 1 review for item with a single review', function(assert) {
  this.set('result', {
    id: 1,
    reviews: [{id: 9}]
  });

  this.render(hbs`{{reviewed result.reviews}}`);

  assert.equal(this.$().text().trim(), '1 review');
});

test('should return 2 reviews for item with 2 reviews', function(assert) {
  this.set('result', {
    id: 1,
    reviews: [{id: 9}, {id: 8}]
  });

  this.render(hbs`{{reviewed result.reviews}}`);

  assert.equal(this.$().text().trim(), '2 reviews');
});

test('should return no reviews when reviews array not hydrated', function(assert) {
  this.set('result', {
    id: 1,
    reviews: []
  });

  this.render(hbs`{{reviewed result.reviews}}`);

  assert.equal(this.$().text().trim(), 'not yet reviewed');
});

test('should return no reviews when result has no reviews array', function(assert) {
  this.set('result', {
    id: 1
  });

  this.render(hbs`{{reviewed result.reviews}}`);

  assert.equal(this.$().text().trim(), 'not yet reviewed');
});
