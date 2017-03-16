import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpHeaderComponent = Ember.Component.extend({
    doFocus: function() {
        this._super(...arguments);
        Ember.run.next(() => {
          Ember.$('button').focus();
        });
    }.on('didRender'),
    layout: hbs`
      <div class="row">
        <div class="site-logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="search-form form-inline">
          <input class="form-control" type="text" placeholder="find tacos"/>
          <input class="form-control" type="text" placeholder="near des moines"/>
        </div>
        <button style="float: right;" onclick={{action logout}}>logout</button>
      </div>
    `
});

export default WelpHeaderComponent;
