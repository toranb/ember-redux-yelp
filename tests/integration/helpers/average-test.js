import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('helper:average', 'Integration | Helper | average', {
  integration: true
});

test('renders empty string when reviews undefined', function(assert) {
  this.set('reviews', undefined);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders empty string when reviews is empty array', function(assert) {
  this.set('reviews', []);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '');
});

test('renders 4 stars with 2 reviews that sum 8 total', function(assert) {
  this.set('reviews', [
    {id: 1, rating: 4},
    {id: 2, rating: 4}
  ]);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★');
});

test('renders 3 stars with 3 reviews that sum 9 total', function(assert) {
  this.set('reviews', [
    {id: 1, rating: 1},
    {id: 2, rating: 6},
    {id: 3, rating: 2}
  ]);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '★★★');
});

test('renders 3 stars with 2 reviews that sum 6 total', function(assert) {
  this.set('reviews', [
    {id: 1, rating: 1},
    {id: 2, rating: 5}
  ]);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '★★★');
});

test('renders 5 stars with 1 review that equals 5', function(assert) {
  this.set('reviews', [
    {id: 1, rating: 5}
  ]);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★★');
});

test('renders 4.5 stars with 2 reviews that sum 9 total', function(assert) {
  this.set('reviews', [
    {id: 1, rating: 4},
    {id: 2, rating: 5}
  ]);
  this.render(hbs`{{average reviews}}`);
  assert.equal(this.$().text().trim(), '★★★★½');
});
