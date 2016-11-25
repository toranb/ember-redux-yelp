import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welp-detail', 'Integration | Component | welp-detail', {
  integration: true
});

test('should display result detail name', function(assert) {
  this.set('comment', () => {});
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: []
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-name').length, 1);
  assert.equal(this.$().find('.detail-name').text().trim(), 'two');
});

test('should display each review with comment and rating', function(assert) {
  this.set('comment', () => {});
  this.set('rate', () => {});
  this.set('result', {
    id: 2,
    name: 'two',
    reviews: [
      {id: 9, rating: 5, comment: 'x'},
      {id: 8, rating: 4, comment: 'y'}
    ]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-rating').length, 2);
  assert.equal(this.$().find('.detail-rating:eq(0)').text().trim(), 'x 5 ★ review');
  assert.equal(this.$().find('.detail-rating:eq(1)').text().trim(), 'y 4 ★ review');
});

test('star rating exists with onclick closure action', function(assert) {
  assert.expect(5);
  this.set('comment', () => {});
  this.set('rate', (id, rating) => {
    assert.equal(id, 2);
    assert.equal(rating, 5);
  });
  this.set('result', {
    id: 2, name: 'two', reviews: []
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.star-group').length, 2);
  assert.equal(this.$().find('.star-group span').length, 10);
  assert.equal(this.$().find('.star-group span:eq(0)').text(), '★');

  this.$().find('.star-group:eq(0) span:eq(4)').trigger('click');
});

test('star rating width reflected visually', function(assert) {
  this.set('comment', () => {});
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.star-group').length, 2);
  assert.equal(this.$().find('.star-group').attr('style'), 'width: 60%');
});

test('when result has a rating the textarea/buttons are visible for comment', function(assert) {
  this.set('comment', () => {});
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-comment textarea').length, 1);
  assert.equal(this.$().find('.detail-comment button.btn-success').length, 1);
  assert.equal(this.$().find('.detail-comment button.btn-success').text(), 'Post Review');
  assert.equal(this.$().find('.detail-comment .note').text(), '*You can always edit your review later');
});

test('when result has no rating the textarea/buttons are not visible for comment', function(assert) {
  this.set('comment', () => {});
  this.set('rate', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-comment textarea').length, 0);
  assert.equal(this.$().find('.detail-comment button.btn-success').length, 0);
});

test('clicking btn-success will trigger wired closure action', function(assert) {
  assert.expect(2);
  this.set('rate', () => {});
  this.set('comment', (id, comment) => {
    assert.equal(id, 2);
    assert.equal(comment, 'wat');
  });
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  this.$().find('.detail-comment textarea').val('wat').trigger('input');
  this.$().find('.detail-comment button.btn-success').trigger('click');
});

test('textarea will show the value of an existing comment', function(assert) {
  this.set('rate', () => {});
  this.set('comment', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, comment: 'foo', reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-comment textarea').length, 1);
  assert.equal(this.$().find('.detail-comment textarea').val(), 'foo');
});

test('clicking btn-danger will reset to previous (persisted) comment', function(assert) {
  this.set('rate', () => {});
  this.set('comment', () => {});
  this.set('result', {
    id: 2, name: 'two', reviews: [{id: 9, rating: 3, comment: 'foo', reviewed: true}]
  });

  this.render(hbs`{{welp-detail result=result rate=rate comment=comment}}`);

  assert.equal(this.$().find('.detail-comment textarea').val(), 'foo');
  assert.equal(this.$().find('.detail-comment button.btn-danger').text(), 'Reset');

  this.$().find('.detail-comment textarea').val('wat').trigger('input');
  assert.equal(this.$().find('.detail-comment textarea').val(), 'wat');

  this.$().find('.detail-comment button.btn-danger').trigger('click');
  assert.equal(this.$().find('.detail-comment textarea').val(), 'foo');
});
