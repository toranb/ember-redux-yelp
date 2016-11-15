import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welp-detail', 'Integration | Component | welp-detail', {
  integration: true
});

test('should display result detail name', function(assert) {
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two'
  });

  this.render(hbs`{{welp-detail result=result rate=rate}}`);

  assert.equal(this.$().find('.detail-name').length, 1);
  assert.equal(this.$().find('.detail-name').text().trim(), 'two');
});

test('should display each review with comment and rating', function(assert) {
  this.set('rate', () => {});
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [
      {id: 9, rating: 5, comment: 'x'},
      {id: 8, rating: 4, comment: 'y'}
    ]
  });

  this.render(hbs`{{welp-detail result=result rate=rate}}`);

  assert.equal(this.$().find('.detail-rating').length, 2);
  assert.equal(this.$().find('.detail-rating:eq(0)').text().trim(), 'x 5 ★ review');
  assert.equal(this.$().find('.detail-rating:eq(1)').text().trim(), 'y 4 ★ review');
});

test('star rating exists with onclick closure action', function(assert) {
  assert.expect(5);
  this.set('rate', (id, rating) => {
    assert.equal(id, 2);
    assert.equal(rating, 5);
  });
  this.set('result', {
    id: 2, name: 'two'
  });

  this.render(hbs`{{welp-detail result=result rate=rate}}`);

  assert.equal(this.$().find('.star-group').length, 1);
  assert.equal(this.$().find('.star-group span').length, 5);
  assert.equal(this.$().find('.star-group span:eq(0)').text(), '★');

  this.$().find('.star-group span:eq(4)').trigger('click');
});

test('star rating width reflected visually', function(assert) {
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate}}`);

  assert.equal(this.$().find('.star-group').length, 1);
  assert.equal(this.$().find('.star-group').attr('style'), 'width: 60%');
});
