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
