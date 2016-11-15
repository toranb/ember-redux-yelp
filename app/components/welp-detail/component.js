import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  layout: hbs`
    {{#each result.reviews as |review|}}
      <div class="detail-rating">{{review.comment}} {{review.rating}} ★ review</div>
    {{/each}}

    <div class="star-group">
      <span onclick={{action rate result.id 1}}>★</span>
      <span onclick={{action rate result.id 2}}>★</span>
      <span onclick={{action rate result.id 3}}>★</span>
      <span onclick={{action rate result.id 4}}>★</span>
      <span onclick={{action rate result.id 5}}>★</span>
    </div>

    <div class="detail-name">{{result.name}}</div>
  `
});

export default WelpDetailComponent;
