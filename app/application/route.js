import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
  redux: Ember.inject.service(),
  theme: Ember.inject.service(),
  beforeModel() {
    let redux = this.get('redux');
    let theme = this.get('theme');

    let user = Ember.$('[preload-user]').data('configuration');
    redux.dispatch({
      type: 'ASSIGN_USER',
      user: user
    });

    let configuredThemes = Ember.$('[preload-themes]').data('configuration');
    let availableThemes = configuredThemes.map((theme) => {
      return Ember.Object.create({
        id: theme.id,
        name: theme.name
      });
    });
    theme.set('availableThemes', availableThemes);
  },
  model() {
    let theme = this.get('theme');
    let lastTheme = Ember.$.cookie('themeName');
    return theme.processThemeBundle(lastTheme);
  }
});

export default ApplicationRoute;
