import Ember from 'ember';
import _ from 'lodash';

export const DEFAULT_THEME_NAME = 'theme-default';
export const DEFAULT_THEME_ID = 1;

export default Ember.Service.extend({
  redux: Ember.inject.service(),
  activeThemeName: Ember.computed.alias('activeTheme.shortName'),
  activeTheme: Ember.computed('availableThemes', function() {
    let availableThemes = this.get('availableThemes');
    return _.filter(availableThemes, (t) => t.active === true)[0];
  }),
  availableThemes: Ember.computed(function() {
    let redux = this.get('redux');
    let state = redux.getState();
    return state.theme.available;
  }),
  processThemeBundle: function(incoming) {
    let redux = this.get('redux');
    let themeName = incoming || DEFAULT_THEME_NAME;
    let availableThemes = this.get('availableThemes');
    let firstTheme = _.filter(availableThemes, (t) => {
        return t.name === themeName;
    })[0] || availableThemes[DEFAULT_THEME_ID];
    let nameOnly = themeName.replace('theme-', '');
    if (firstTheme) {
      redux.dispatch({
        type: 'ACTIVATE_THEME',
        theme: firstTheme,
        shortName: nameOnly
      });
    }
  },
  updateTheme: function(response) {
    let newThemeId = response.themeId;
    let newThemeName = response.themeName;
    let newThemeShortName = newThemeName.replace('theme-', '');
    let activeThemeName = this.get('activeThemeName');
    if (activeThemeName !== newThemeShortName) {
      this.activateNewTheme(newThemeId, newThemeName, newThemeShortName);
    }
  },
  activateNewTheme: function(themeId, themeName, shortName) {
    this.flipTheActiveTheme(themeId, themeName, shortName);
    this.fetchTheNewTheme(shortName);
    this.persistLocally(shortName);
  },
  flipTheActiveTheme: function(id, name, shortName) {
    let redux = this.get('redux');
    let activeTheme = this.get('activeTheme');
    redux.dispatch({
      type: 'ACTIVATE_NEW_THEME',
      id: id,
      name: name,
      shortName: shortName
    });
  },
  fetchTheNewTheme: function(themeName) {
    let themeUrl = `/themes/${themeName}.css`;
    let themeLink = document.createElement('link');
    themeLink.href = themeUrl;
    themeLink.rel = 'stylesheet';
    themeLink.type = 'text/css';
    document.body.appendChild(themeLink);
  },
  persistLocally: function(shortName) {
    Ember.$.cookie('themeName', `theme-${shortName}`);
  },
  init() {
    this._super(...arguments);
    let redux = this.get('redux');
    this.unsubscribe = redux.subscribe(() => {
      this.notifyPropertyChange('availableThemes');
    });
  },
  willDestroy() {
    this._super(...arguments);
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
});
