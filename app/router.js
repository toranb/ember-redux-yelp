import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('results', {path: '/'}, function() {
    this.route('detail', {path: '/detail/:index'});
  });
});

export default Router;
