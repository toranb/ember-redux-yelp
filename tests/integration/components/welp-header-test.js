import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welp-header', 'Integration | Component | welp-header', {
  integration: true
});

test('should have site logo and form search fields', function(assert) {
  this.render(hbs`{{welp-header}}`);

  assert.equal(this.$().find('.site-logo img').attr('src'), '/images/logo.png');
  assert.equal(this.$().find('.search-form input').length, 2);
  assert.equal(this.$().find('.search-form input:eq(0)').attr('type'), 'text');
  assert.equal(this.$().find('.search-form input:eq(1)').attr('type'), 'text');
  assert.equal(this.$().find('.search-form input:eq(0)').attr('placeholder'), 'find tacos');
  assert.equal(this.$().find('.search-form input:eq(1)').attr('placeholder'), 'near des moines');
});
