import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import usersMockData from 'common/mocks/users';

let usersData = usersMockData;

// Reducer
const data = (state = usersData, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.users && action.payload.users.data
          ? action.payload.users.data
          : state;
      usersData = rehydratedData;
      return rehydratedData;
    default:
      return state;
  }
};

export default combineReducers({
  data,
});

// Getter
export const getData = state => state.data;
export const getDataWithUserName = state => username => state.data[username] || {};
