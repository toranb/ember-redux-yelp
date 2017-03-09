const initialState = {
  themes: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'AVAILABLE_THEMES':
      return Object.assign({}, state, {
        themes: action.themes
      });
    default:
      return state || initialState;
  }
});
