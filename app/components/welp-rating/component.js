import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const WelpRatingComponent = Ember.Component.extend({
  layout: hbs`
    <div class="star-group" style={{width}}>
      <div class="star-container">
        {{#each stars as |star|}}
        <span onclick={{action rate star}}>★</span>
        {{/each}}
      </div>
    </div>
    <div class="star-group backdrop">
      <div class="star-container">
        {{#each stars as |star|}}
        <span onclick={{action rate star}}>★</span>
        {{/each}}
      </div>
    </div>
  `,
  stars: [1, 2, 3, 4, 5],
  width: Ember.computed('reviews', function() {
    const reviews = this.get('reviews') || {};
    const reviewed = Object.values(reviews).filter(review => {
      return review.reviewed ? review : undefined;
    })[0];
    const stars = reviewed ? (reviewed.rating / 5) * 100 : 0;
    return Ember.String.htmlSafe(`width: ${stars}%`);
  })
});

export default WelpRatingComponent;
