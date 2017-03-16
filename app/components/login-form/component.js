import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

var WelpLayoutComponent = Ember.Component.extend({
    doFocus: function() {
        this._super(...arguments);
        Ember.run.next(() => {
          Ember.$('input#username').focus();
        });
    }.on('didRender'),
    layout: hbs`
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-16 col-md-auto">
            <div class="the-login">
              <form {{action login buffer on="submit"}}>
                <div class="logo">
                  <img src="/images/logo.png" alt="">
                </div>
                <div class="form-group">
                  <input id="username" class="form-control" type="text" placeholder="username" oninput={{action (mut buffer) value="target.value"}} autocomplete="off" autocorrect="off" autocapitalize="off" />
                </div>
                <div class="form-group">
                  <input id="password" class="form-control" type="password" placeholder="password" />
                </div>
                <div class="form-group">
                  <button class="btn btn-block" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
});

export default WelpLayoutComponent;
