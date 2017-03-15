const initialState = {
  username: undefined,
  authenticated: false
};

export default ((state, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        authenticated: true,
        username: action.response.username
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, initialState);
    default:
      return state || initialState;
  }
});
