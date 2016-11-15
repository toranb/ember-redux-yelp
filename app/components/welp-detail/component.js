import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  layout: hbs`
    {{#each result.reviews as |review|}}
      <div class="detail-rating">{{review.comment}} {{review.rating}} ★ review</div>
    {{/each}}

    <div class="star-group" style={{width}}>
      <span onclick={{action rate result.id 1}}>★</span>
      <span onclick={{action rate result.id 2}}>★</span>
      <span onclick={{action rate result.id 3}}>★</span>
      <span onclick={{action rate result.id 4}}>★</span>
      <span onclick={{action rate result.id 5}}>★</span>
    </div>

    <div class="detail-name">{{result.name}}</div>
  `,
  width: Ember.computed('result.reviews', function() {
    var reviews = this.get('result.reviews') || [];
    var reviewed = reviews.filter((review) => {
      return review.reviewed ? review : undefined;
    })[0];
    var stars = reviewed ? (reviewed.rating / 5) * 100 : 0;
    return Ember.String.htmlSafe(`width: ${stars}%`);
  })
});

export default WelpDetailComponent;
