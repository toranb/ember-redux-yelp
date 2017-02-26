import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    this.get('result.reviews').forEach((review) => {
      if (review.reviewed) {
        this.set('buffer', review.comment);
      }
    });
  },
  layout: hbs`
    {{#each result.reviews as |review|}}
      <div class="detail-rating">{{review.comment}} {{review.rating}} ★ review</div>
    {{/each}}

    {{welp-rating result=result rate=rate}}

    <div class="detail-name">{{result.name}}</div>

    {{#each result.reviews as |review|}}
      {{#if review.reviewed}}
        <p class="detail-comment">
          <textarea value={{buffer}} rows="4" cols="70" oninput={{action (mut buffer) value="target.value"}}></textarea>
          <button class="btn-success" onclick={{action comment result.id buffer}}>Post Review</button>
          <button class="btn-danger" onclick={{action (mut buffer) review.comment}}>Reset</button>
          <span class="note">*You can always edit your review later</span>
        </p>
      {{/if}}
    {{/each}}
  `
});

export default WelpDetailComponent;
