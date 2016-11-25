import Ember from 'ember';

export default function() {
  let routeTransitions = [];
  let FakeRoutingService = Ember.Service.extend({
    generateURL: function() { return; },
    transitionTo: function(name, args) {
      routeTransitions.push({name: name, args: args});
    }
  });
  this.registry.register('service:-routing', FakeRoutingService);
  this.inject.service('-routing');
  return routeTransitions;
}
