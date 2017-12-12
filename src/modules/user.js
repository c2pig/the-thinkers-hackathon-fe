const initialState = {
  username: ''
};

// Actions
export const LOGIN = 'login';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};
