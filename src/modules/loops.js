import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ADD_LOOP } from './loopList';
import loopsMockData from 'common/mocks/loops';

let loopsData = loopsMockData;

// Reducer
const data = (state = loopsData, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload &&
        action.payload.loops &&
        action.payload.loops.data
          ? action.payload.loops.data
          : state;
      loopsData = rehydratedData;
      return rehydratedData;
    case ADD_LOOP:
      loopsData = { ...loopsData, [action.data.id]: action.data };
      return loopsData;
    default:
      return state;
  }
};

export default combineReducers({
  data,
});

// Getter
export const getData = state => state.data;
