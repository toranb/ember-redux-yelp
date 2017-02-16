import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import trim from 'welp/tests/helpers/trim';

moduleForComponent('welp-rating', 'Integration | Component | welp-rating', {
  integration: true
});

test('the first star-group width should reflect the reviews average', function(assert) {
  assert.expect(5);

  this.set('rate', () => {});
  this.set('result', {
      id: 1,
      reviews: [{id: 2, rating: 3, reviewed: true}]
  });

  this.render(hbs`{{welp-rating result=result rate=rate}}`);

  assert.equal(this.$().find('.star-group').length, 2);
  assert.equal(this.$().find('.star-group:eq(0)').attr('style'), 'width: 60%');
  assert.equal(trim(this.$().find('.star-group:eq(0)').text(), true), '★★★★★');
  assert.equal(this.$().find('.star-group:eq(1)').attr('style'), undefined);
  assert.equal(trim(this.$().find('.star-group:eq(1)').text(), true), '★★★★★');
});
