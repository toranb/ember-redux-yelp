import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    const reviews = this.get('reviews') || {};
    Object.values(reviews).forEach(review => {
      if (review.reviewed) {
        this.set('buffer', review.comment);
      }
    });
  },
  layout: hbs`
    {{#each-in reviews as |key review|}}
      <div class="detail-rating">{{review.comment}} {{review.rating}} ★ review</div>
    {{/each-in}}

    {{welp-rating reviews=reviews rate=(action rate result.id)}}

    <div class="detail-name">{{result.name}}</div>

    {{#each-in reviews as |key review|}}
      {{#if review.reviewed}}
        <p class="detail-comment">
          <textarea value={{buffer}} rows="4" cols="70" oninput={{action (mut buffer) value="target.value"}}></textarea>
          <button class="btn-success" onclick={{action comment result.id buffer}}>Post Review</button>
          <button class="btn-danger" onclick={{action (mut buffer) review.comment}}>Reset</button>
          <span class="note">*You can always edit your review later</span>
        </p>
      {{/if}}
    {{/each-in}}
  `
});

export default WelpDetailComponent;
