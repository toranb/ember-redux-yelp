import { test } from 'qunit';
import moduleForAcceptance from 'welp/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | results');

test('results route should list each result by name', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
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
    assert.equal(find('.search-results-list .result-reviews:eq(0)').text().trim(), '★★★1 review');
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
    assert.equal(find('.star-group').length, 1);
  });
  server.post('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {rating: 4});
    return {result: {id: 5, reviews: [{id: 9, rating: 4}]}};
  });
  click('.star-group span:eq(3)');
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
    assert.equal(find('.star-group').length, 1);
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 4 ★ review');
  });
  server.post('/api/results/:id', (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.deepEqual(params, {rating: 2});
    return {result: {id: 2, reviews: [{id: 2, rating: 5, comment: 'good food!'}, {id: 3, rating: 2, comment: 'yup', reviewed: true}]}};
  });
  click('.star-group span:eq(1)');
  andThen(function() {
    assert.equal(find('.detail-rating').length, 2);
    assert.equal(find('.detail-rating:eq(0)').text().trim(), 'good food! 5 ★ review');
    assert.equal(find('.detail-rating:eq(1)').text().trim(), 'yup 2 ★ review');
  });
});
