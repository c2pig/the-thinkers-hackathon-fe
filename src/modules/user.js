import { REHYDRATE } from 'redux-persist';
const initialState = {
  username: ''
};

// Actions
export const LOGIN = 'login';

export const getUser = state => {
  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.loops && action.payload.loops.data
          ? Object.keys(action.payload.loops.data)
          : state;
      return rehydratedData;
    case LOGIN:
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};
