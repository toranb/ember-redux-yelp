import { test } from 'qunit';
import moduleForAcceptance from 'welp/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | results');

test('results route should list each result by name', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.search-results-list li').length, 5);
    assert.equal(find('.search-results-list li:eq(0)').text().trim(), 'Tacopocalypse');
    assert.equal(find('.search-results-list li:eq(1)').text().trim(), 'Fuzzy’s Taco Shop');
    assert.equal(find('.search-results-list li:eq(2)').text().trim(), 'Tacos Andreas');
    assert.equal(find('.search-results-list li:eq(3)').text().trim(), 'Tasty Tacos');
    assert.equal(find('.search-results-list li:eq(4)').text().trim(), 'El Bait Shop');
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
