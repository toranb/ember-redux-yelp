import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('component:welp-rating');

test('rated with 1 returns width of 20%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 1, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 20%');
});

test('rated with 2 returns width of 40%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 2, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 40%');
});

test('rated with 3 returns width of 60%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 3, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 60%');
});

test('rated with 4 returns width of 80%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 4, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 80%');
});

test('rated with 5 returns width of 100%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 5, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 100%');
});

test('not yet rated returns width of 0%', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 5}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 0%');
});

test('width will recompute when reviews are added', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 5}]
    }
  });
  let width = subject.get('width');
  assert.equal(width.toString(), 'width: 0%');

  Ember.run(() => {
    subject.set('result.reviews', [
      {id: 2, rating: 5},
      {id: 3, rating: 4, reviewed: true}
    ]);
  });

  width = subject.get('width');
  assert.equal(width.toString(), 'width: 80%');
});

test('width is htmlSafe', function(assert) {
  let subject = this.subject({
    result: {
      id: 1,
      reviews: [{id: 2, rating: 5, reviewed: true}]
    }
  });
  let width = subject.get('width');
  assert.ok(width instanceof Ember.Handlebars.SafeString);
});
