import { moduleForComponent, test } from 'ember-qunit';
import trim from 'welp/tests/helpers/trim';
import hbs from 'htmlbars-inline-precompile';
import fakeRouting from 'welp/tests/helpers/routing';

moduleForComponent('welp-list', 'Integration | Component | welp-list', {
  integration: true
});

test('should transform results dict into unordered list', function(assert) {
  this.set('results', {
    1: {
      id: 1, name: 'one', img: '/images/one.jpg', tags: 'Mexican', price: '$', address: '123 Main St.', reviews: []
    },
    2: {
      id: 2, name: 'two', img: '/images/two.jpg', tags: 'Bars', price: '$$', address: 'moar ave'
    }
  });

  this.render(hbs`{{welp-list results=results}}`);

  assert.equal(this.$().find('ul.search-results-list .result-heading').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-heading:eq(0)').text().trim(), 'one');
  assert.equal(this.$().find('ul.search-results-list .result-heading:eq(1)').text().trim(), 'two');

  assert.equal(this.$().find('ul.search-results-list .result-img').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-img:eq(0) img').attr('src'), '/images/one.jpg');
  assert.equal(this.$().find('ul.search-results-list .result-img:eq(1) img').attr('src'), '/images/two.jpg');

  assert.equal(this.$().find('ul.search-results-list .result-price-tags').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-price-tags:eq(0)').text().trim(), '$ Mexican');
  assert.equal(this.$().find('ul.search-results-list .result-price-tags:eq(1)').text().trim(), '$$ Bars');

  assert.equal(this.$().find('ul.search-results-list .result-addr').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-addr:eq(0)').text().trim(), '123 Main St.');
  assert.equal(this.$().find('ul.search-results-list .result-addr:eq(1)').text().trim(), 'moar ave');

  assert.equal(this.$().find('ul.search-results-list .result-review').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-review:eq(0)').text().trim(), 'write the first review!');
  assert.equal(this.$().find('ul.search-results-list .result-review:eq(1)').text().trim(), 'write the first review!');
});

test('should include average star rating', function(assert) {
  this.set('results', {
    1: {
      id: 1, name: 'one', reviews: [{id: 1, rating: 1, comment: 'yup'}]
    }
  });

  this.render(hbs`{{welp-list results=results}}`);

  assert.equal(this.$().find('ul.search-results-list .result-reviews').length, 1);
  assert.equal(this.$().find('ul.search-results-list .result-reviews:eq(0)').text().trim(), '★ 1 review');

  assert.equal(this.$().find('ul.search-results-list .result-review').length, 1);
  assert.equal(trim(this.$().find('ul.search-results-list .result-review:eq(0)').text().trim()), 'yup read more');
});

test('clicking read more/ and write the first review links redirect to detail route', function(assert) {
  assert.expect(5);
  let routeTransitions = fakeRouting.apply(this);

  this.set('results', {
    1: {
      id: 1, name: 'one', reviews: [{id: 1, rating: 1, comment: 'yup'}],
    },
    2: {
      id: 2, name: 'two', reviews: []
    }
  });

  this.render(hbs`{{welp-list results=results}}`);

  assert.equal(this.$().find('ul.search-results-list .result-review').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-review:eq(0) a').text(), 'read more');
  assert.equal(this.$().find('ul.search-results-list .result-review:eq(1) a').text(), 'write the first review!');

  this.$('.search-results-list .result-review:eq(0) a').trigger('click');
  assert.deepEqual(routeTransitions, [
    {name: 'results.detail', args: [1]}
  ]);

  this.$('.search-results-list .result-review:eq(1) a').trigger('click');
  assert.deepEqual(routeTransitions, [
    {name: 'results.detail', args: [1]},
    {name: 'results.detail', args: [2]}
  ]);
});
