import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { getLoopsData } from './modules';
import uuid from 'uuid/v4';

import loopsMockData from 'common/mocks/loops';

let loopsData = Object.keys(loopsMockData);
console.log(loopsData);

// Actions
const UPDATE_SEARCH_KEYWORDS = 'UPDATE_SEARCH_KEYWORDS';
const SEARCH_LOOPS = 'SEARCH_LOOPS';
export const ADD_LOOP = 'ADD_LOOP';

// Reducer
const searchKeywords = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_KEYWORDS:
      return action.keywords;
    default:
      return state;
  }
};

const ids = (state = loopsData, action) => {
  switch (action.type) {
    case SEARCH_LOOPS:
      return action.data;
    case ADD_LOOP:
      return [...state, action.data.id];
    case REHYDRATE:
      const rehydratedData =
        action.payload &&
        action.payload.loopList &&
        action.payload.loopList.ids &&
        action.payload.loopList.ids.length > 0
          ? action.payload.loopList.ids
          : state;
      loopsData = rehydratedData;
      return rehydratedData;
    default:
      return state;
  }
};

export default combineReducers({
  searchKeywords,
  ids,
});

// Action Creators
export const updateSearchKeywords = keywords => ({
  type: UPDATE_SEARCH_KEYWORDS,
  keywords,
});
export const searchLoops = () => (dispatch, getState) => {
  const state = getState();
  const keywords = getSearchKeywords(state.loopList);
  const loopsData = getLoopsData(state.loops);
  const filteredLoops = keywords
    ? loopsData.filter(
        loop => loop.title.toLowerCase().indexOf(keywords.toLowerCase()) > -1
      )
    : loopsData;
  dispatch({
    type: SEARCH_LOOPS,
    data: filteredLoops.map(loop => loop.id),
  });
};

export const addLoop = () => (dispatch, getState) => {
  const state = getState();
  const keywords = getSearchKeywords(state.loopList);
  dispatch({
    type: ADD_LOOP,
    data: {
      id: uuid(),
      title: keywords,
      tags: [keywords],
    },
  });
};

// Getter
export const getSearchKeywords = state => state.searchKeywords;
export const getIds = state => state.ids;
