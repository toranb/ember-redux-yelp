import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  layout: hbs`
    {{#each result.reviews as |review|}}
      <div class="detail-rating">{{review.comment}} {{review.rating}} ★ review</div>
    {{/each}}
    <div class="detail-name">{{result.name}}</div>
  `
});

export default WelpDetailComponent;
