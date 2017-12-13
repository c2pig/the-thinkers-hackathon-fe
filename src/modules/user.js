import { REHYDRATE } from 'redux-persist';
const initialState = {
  username: '',
};

// Actions
export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const getUser = state => {
  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.user && action.payload.user.data
          ? Object.keys(action.payload.user.data)
          : state;
      return rehydratedData;
    case LOGIN:
      return { ...state, username: action.payload.username };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const logoutUser = () => ({
  type: LOGOUT,
});

export const getCurrentUser = state => state.username;
