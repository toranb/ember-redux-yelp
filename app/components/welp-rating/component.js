import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpRatingComponent = Ember.Component.extend({
  layout: hbs`
    <div class="star-group" style="width: {{width}}%">
      <div class="star-container">
        {{#each stars as |star|}}
        <span onclick={{action rate result.id star}}>★</span>
        {{/each}}
      </div>
    </div>
    <div class="star-group backdrop">
      <div class="star-container">
        {{#each stars as |star|}}
        <span onclick={{action rate result.id star}}>★</span>
        {{/each}}
      </div>
    </div>
  `,
  stars: [1, 2, 3, 4, 5],
  width: Ember.computed(function() {
    var reviews = this.get('result.reviews') || [];
    var reviewed = reviews.filter((review) => {
      return review.reviewed ? review : undefined;
    })[0];
    var stars = reviewed ? (reviewed.rating / 5) * 100 : 0;
    return stars;
  })
});

export default WelpRatingComponent;
