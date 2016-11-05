import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpDetailComponent = Ember.Component.extend({
  layout: hbs`
    <div class="detail-name">{{result.name}}</div>
  `
});

export default WelpDetailComponent;
