const initialState = {
  all: undefined,
  authenticatedId: undefined
};

export default ((state, action) => {
  switch(action.type) {
    case 'ASSIGN_USER': {
      const userId = action.user.id;
      const user = {[userId]: action.user};
      return {
        ...state,
        all: {...state.all, ...user},
        authenticatedId: userId
      }
    }
    default: {
      return state || initialState;
    }
  }
});
