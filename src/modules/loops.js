import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ADD_LOOP } from './loopList';
import loopsMockData from 'common/mocks/loops';

let loopsData = loopsMockData;

export const DROP_MESSAGE = 'DROP_MESSAGE';
export const CLOSE_TOPIC = 'CLOSE_TOPIC';

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
        date: new Date().toString(),
        rating: 1,
        totalHired: 10,
        headline: 'i am kong',
        phone: '123',
        email: 'kong@gmail.com',
        ...action.payload
      };
      loop.comments.push(comment);

      return {
        ...state,
        [action.payload.loopId]: { ...loop, comments: [...loop.comments] }
      };

    case CLOSE_TOPIC:
      let closedloop = state[action.payload.loopId];
      closedloop.status = 'closed';
      closedloop.closeTopicResponder = action.payload.closeTopicResponder;

      return {
        ...state,
        [action.payload.loopId]: { ...closedloop }
      };
    default:
      return state;
  }
};

export default combineReducers({
  data
});

// Getter
export const getData = state => state.data;
