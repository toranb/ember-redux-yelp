import { DEFAULT_THEME_ID, DEFAULT_THEME_NAME } from 'welp/services/theme';

const initialState = {
  username: undefined,
  authenticated: false,
  themeId: DEFAULT_THEME_ID,
  themeName: DEFAULT_THEME_NAME
};

export default ((state, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        authenticated: true,
        username: action.response.username,
        themeId: action.response.themeId,
        themeName: action.response.themeName
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, initialState);
    default:
      return state || initialState;
  }
});
