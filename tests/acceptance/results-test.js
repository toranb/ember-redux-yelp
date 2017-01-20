import { test } from 'qunit';
import moduleForAcceptance from 'welp/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | results');

test('results route should list each result by name', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.site-logo').length, 1);
    assert.equal(find('.search-results-list .result-heading').length, 5);
    assert.equal(find('.search-results-list .result-heading:eq(0)').text().trim(), 'Tacopocalypse');
    assert.equal(find('.search-results-list .result-heading:eq(4)').text().trim(), 'El Bait Shop');
  });
});

test('clicking result name will redirect to the detail route', function(assert) {
  visit('/');
  click('.search-results-list li:eq(3) a');
  andThen(function() {
    assert.equal(currentURL(), '/detail/4');
    assert.equal(find('.detail-name').length, 1);
    assert.equal(find('.detail-name').text().trim(), 'Tasty Tacos');
  });
  click('.search-results-list li:eq(1) a');
  andThen(function() {
    assert.equal(currentURL(), '/detail/2');
    assert.equal(find('.detail-name').length, 1);
    assert.equal(find('.detail-name').text().trim(), 'Fuzzy’s Taco Shop');
  });
});

test('each result shows the number of ratings from the list view', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.search-results-list .result-reviews').length, 5);
    assert.equal(find('.search-results-list .result-reviews:eq(0)').text().trim(), '★★★ 1 review');
    assert.equal(find('.search-results-list .result-reviews:eq(4)').text().trim(), 'not yet reviewed');
  });
});

test('detail route will show each rating and comment', function(assert) {
  visit('/detail/2');
  andThen(function() {
    assert.equal(currentURL(), '/detail/2');
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 4 ★ review');
  });
});

test('detail route allows user to rate result not yet rated by the user', function(assert) {
  assert.expect(6);
  visit('/detail/5');
  andThen(function() {
    assert.equal(currentURL(), '/detail/5');
    assert.equal(find('.detail-rating').length, 0);
    assert.equal(find('.star-group').length, 2);
  });
  server.post('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {rating: 4});
    return {result: {id: 5, reviews: [{id: 9, rating: 4, userId: 34}]}};
  });
  click('.star-group:eq(0) span:eq(3)');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 1);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), '4 ★ review');
  });
});

test('detail route allows user to update rating for result', function(assert) {
  assert.expect(9);
  visit('/detail/2');
  andThen(function() {
    assert.equal(currentURL(), '/detail/2');
    assert.equal(find('.star-group').length, 2);
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 4 ★ review');
  });
  server.post('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {rating: 2});
    return {result: {id: 2, reviews: [{id: 2, rating: 5, comment: 'good food!', userId: 33}, {id: 3, rating: 2, comment: 'yup', userId: 39}]}};
  });
  click('.star-group:eq(0) span:eq(1)');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 2 ★ review');
  });
});

test('detail route allows user to comment on result not yet rated but only after rating it', function(assert) {
  assert.expect(9);
  visit('/detail/5');
  andThen(function() {
    assert.equal(currentURL(), '/detail/5');
    assert.equal(find('.detail-rating').length, 0);
    assert.equal(find('.detail-comment').length, 0);
  });
  click('.star-group:eq(0) span:eq(3)');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 1);
    assert.equal(find('.detail-comment').length, 1);
  });
  server.put('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {comment: 'wat'});
    return {result: {id: 5, reviews: [{id: 11, rating: 4, comment: 'wat', userId: 39}]}};
  });
  fillIn('.detail-comment textarea', 'wat');
  click('.detail-comment button.btn-success');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 1);
    assert.equal(find('.detail-comment').length, 1);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'wat 4 ★ review');
  });
});

test('detail route allows user to comment after rating it', function(assert) {
  assert.expect(12);
  visit('/detail/2');
  andThen(function() {
    assert.equal(currentURL(), '/detail/2');
    assert.equal(find('.star-group').length, 2);
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 4 ★ review');
    assert.equal(find('.detail-comment').length, 1);
    assert.equal(find('.detail-comment textarea').val(), 'yup');
  });
  server.put('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {comment: 'moar'});
    return {result: {id: 2, reviews: [{id: 2, rating: 5, comment: 'good food!', userId: 33}, {id: 3, rating: 4, comment: 'moar', userId: 39}]}};
  });
  fillIn('.detail-comment textarea', 'moar');
  click('.detail-comment button.btn-success');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'moar 4 ★ review');
    assert.equal(find('.detail-comment').length, 1);
    assert.equal(find('.detail-comment textarea').val(), 'moar');
  });
});
