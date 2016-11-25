import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpListComponent = Ember.Component.extend({
    layout: hbs`
      <div class="row">
        <div class="search-results">
          <div class="search-results__list">
            <ul class="search-results-list">
              {{#each-in results as |key result|}}
              <li class="search-results-list__item">
                <div class="result">
                  <div class="result-left result-img">
                    <img class="result-object img-rounded" src={{result.img}}>
                  </div>
                  <div class="result-mid">
                    <h5 class="result-heading">{{result.name}}</h5>
                    <div class="smallish result-reviews">{{average result.reviews}} {{#link-to "results.detail" result.id}}{{reviewed result.reviews}}{{/link-to}}</div>
                    <div class="smallish result-price-tags">{{result.price}} {{result.tags}}</div>
                  </div>
                  <div class="result-body">
                    <p class="smallish result-addr">{{result.address}}</p>
                  </div>
                </div>
                <div class="result-review">
                  <p>
                    {{result.reviews.0.comment}}
                    {{#if result.reviews}}
                      {{#link-to "results.detail" result.id}}read more{{/link-to}}
                    {{else}}
                      {{#link-to "results.detail" result.id}}write the first review!{{/link-to}}
                    {{/if}}
                  </p>
                </div>
              </li>
              {{/each-in}}
            </ul>
          </div>
          <div class="search-results__map">
            <div class="search-result-map-box">
              <div class="map-header">
                <h6>Search results</h6>
              </div>
              <div id="map" class="map-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    `
});

export default WelpListComponent;
