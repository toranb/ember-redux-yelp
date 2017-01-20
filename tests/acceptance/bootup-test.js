import Ember from 'ember';
import startApp from 'welp/tests/helpers/start-app';
import { test, module } from 'qunit';

let application, redux;

module('Acceptance | bootup', {
    beforeEach: function() {
        application = startApp();
        redux = application.__container__.lookup('service:redux');
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('should add the authenticated user information', function(assert) {
  visit('/');
  andThen(function() {
    let users = redux.getState().users.all;
    let userId = redux.getState().users.authenticatedId;
    assert.deepEqual(users, {'39': {id: 39, name: 'Toran'}});
    assert.equal(userId, 39);
  });
});
