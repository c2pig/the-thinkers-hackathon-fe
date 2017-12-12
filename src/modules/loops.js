import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ADD_LOOP } from './loopList';
import loopsMockData from 'common/mocks/loops';

let loopsData = loopsMockData;

export const DROP_MESSAGE = 'drop message';

// Reducer
const data = (state = loopsData, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.loops && action.payload.loops.data
          ? action.payload.loops.data
          : state;
      loopsData = rehydratedData;
      return rehydratedData;
    case ADD_LOOP:
      loopsData = { ...loopsData, [action.data.id]: action.data };
      return loopsData;
    case DROP_MESSAGE:
      let loop = state[action.payload.loopId];
      const comment = {
        userName: 'Kong',
        date: new Date().toString(),
        rating: 1,
        totalHired: 10,
        headline: 'i am kong',
        phone: '123',
        email: 'kong@gmail.com',
        ...action.payload
      };
      loop.comments.push(comment);
      console.log(loop);

      return { ...state, [action.payload.loopId]: loop };
    default:
      return state;
  }
};

export default combineReducers({
  data
});

// Getter
export const getData = state => state.data;
