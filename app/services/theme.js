import Ember from 'ember';

export const DEFAULT_THEME_NAME = 'theme-default';
export const DEFAULT_THEME_ID = 1;

export default Ember.Service.extend({
  activeThemeName: Ember.computed.alias('activeTheme.shortName'),
  activeTheme: Ember.computed('availableThemes.[]', function() {
    let availableThemes = this.get('availableThemes');
    return availableThemes.findBy('active', true);
  }),
  processThemeBundle: function(incoming) {
    let themeName = incoming || DEFAULT_THEME_NAME;
    let availableThemes = this.get('availableThemes');
    let firstTheme = availableThemes.findBy('name', themeName) || availableThemes.objectAt(0);
    let nameOnly = themeName.replace('theme-', '');
    if (firstTheme) {
      firstTheme.setProperties({
        active: true,
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
    this.flipTheActiveTheme(themeId, themeName);
    this.fetchTheme(shortName);
    this.persistLocally(shortName);
    this.notifyPropertyChange('availableThemes');
  },
  flipTheActiveTheme: function(id, name) {
    let activeTheme = this.get('activeTheme');
    if(activeTheme.get('id') !== id) {
      let availableThemes = this.get('availableThemes');
      let newTheme = Ember.Object.create({id: id, name: name, active: true});
      availableThemes.push(newTheme);
      activeTheme.set('active', false);
    }
  },
  fetchTheme: function(themeName) {
    let themeUrl = `/themes/${themeName}.css`;
    let themeLink = document.createElement('link');
    themeLink.href = themeUrl;
    themeLink.rel = 'stylesheet';
    themeLink.type = 'text/css';
    document.body.appendChild(themeLink);
  },
  persistLocally: function(shortName) {
    Ember.$.cookie('themeName', `theme-${shortName}`);
  }
});
