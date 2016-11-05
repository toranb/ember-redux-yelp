import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpListComponent = Ember.Component.extend({
  layout: hbs`
    <ul class="search-results-list">
      {{#each-in results as |key result|}}
        <li>
          <span>{{result.name}}</span>
        </li>
      {{/each-in}}
    </ul>
  `
});

export default WelpListComponent;
