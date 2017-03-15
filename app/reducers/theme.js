import _ from 'lodash';
import reselect from 'reselect';

const { createSelector } = reselect;

const initialState = {
  available: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'AVAILABLE_THEMES':
      let themes = _.keyBy(action.themes, (theme) => theme.id);
      let merged = _.extend({}, state.available, themes);
      return Object.assign({}, state, {available: merged});
    case 'ACTIVATE_THEME':
      let themeId = action.theme.id;
      let shortName = action.shortName;
      let availableThemes = state.available;
      let activeTheme = _.map([availableThemes[themeId]], theme => {
        return _.defaults({
          active: true,
          shortName: shortName
        }, theme);
      })[0];
      let newlyActiveTheme = {[themeId]: activeTheme};
      let newlyAvailable = _.extend({}, state.available, newlyActiveTheme);
      return Object.assign({}, state, {
        available: newlyAvailable
      });
    case 'ACTIVATE_NEW_THEME':
      let inactiveThemes = _.map(state.available, theme => {
        return _.defaults({
          active: false
        }, theme);
      });
      let inactiveThemesHash = _.keyBy(inactiveThemes, (theme) => theme.id);
      let allAvailableThemes = _.extend({}, state.available, inactiveThemesHash);

      let newTheme = {[action.id]: {id: action.id, name: action.name, shortName: action.shortName, active: true}};
      let transformedActive = _.extend({}, allAvailableThemes, newTheme);

      return Object.assign({}, state, {
        available: transformedActive
      });
    default:
      return state || initialState;
  }
});

const available = state => state.theme.available;

export const getActiveThemeName = createSelector(
  available,
  themes => {
    var activeTheme = _.filter(themes, (t) => t.active === true);
    return activeTheme.length > 0 ? activeTheme[0].shortName : 'default';
  }
);
