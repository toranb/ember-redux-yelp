import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('welp-list', 'Integration | Component | welp-list', {
  integration: true
});

test('should transform results dict into unordered list', function(assert) {
  this.set('results', {
    1: {
      id: 1, name: 'one'
    },
    2: {
      id: 2, name: 'two'
    }
  });

  this.render(hbs`{{welp-list results=results}}`);

  assert.equal(this.$().find('ul.search-results-list .result-heading').length, 2);
  assert.equal(this.$().find('ul.search-results-list .result-heading:eq(0)').text().trim(), 'one');
  assert.equal(this.$().find('ul.search-results-list .result-heading:eq(1)').text().trim(), 'two');
});
