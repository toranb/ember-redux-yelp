import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpLayoutComponent = Ember.Component.extend({
    layout: hbs`
      {{yield}}
    `
});

export default WelpLayoutComponent;
