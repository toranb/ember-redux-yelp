import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welp-detail', 'Integration | Component | welp-detail', {
  integration: true
});

test('should display result detail name', function(assert) {
  this.set('result', {
    id: 2, name: 'two'
  });

  this.render(hbs`{{welp-detail result=result}}`);

  assert.equal(this.$().find('.detail-name').length, 1);
  assert.equal(this.$().find('.detail-name').text().trim(), 'two');
});

test('should display each review with comment and rating', function(assert) {
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [
      {id: 9, rating: 5, comment: 'x'},
      {id: 8, rating: 4, comment: 'y'}
    ]
  });

  this.render(hbs`{{welp-detail result=result}}`);

  assert.equal(this.$().find('.detail-rating').length, 2);
  assert.equal(this.$().find('.detail-rating:eq(0)').text().trim(), 'x 5 ★ review');
  assert.equal(this.$().find('.detail-rating:eq(1)').text().trim(), 'y 4 ★ review');
});
