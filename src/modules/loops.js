import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import loopsMockData from 'common/mocks/loops';

let loopsData = loopsMockData;

// Actions
const UPDATE_SEARCH_KEYWORDS = 'UPDATE_SEARCH_KEYWORDS';
const SEARCH_LOOPS = 'SEARCH_LOOPS';
const ADD_LOOP = 'ADD_LOOP';

// Reducer
const searchKeywords = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_KEYWORDS:
      return action.keywords;
    default:
      return state;
  }
};

const data = (state = loopsData, action) => {
  switch (action.type) {
    case SEARCH_LOOPS:
      return action.data;
    case REHYDRATE:
      const rehydratedData = action.payload &&
          action.payload.loops &&
          action.payload.loops.data &&
          action.payload.loops.data.length > 0
          ? action.payload.loops.data
          : state;
      loopsData = rehydratedData;      
      return rehydratedData;
    case ADD_LOOP:
      loopsData = [...loopsData, action.loop];
      return loopsData;
    default:
      return state;
  }
};

export default combineReducers({
  searchKeywords,
  data,
});

// Action Creators
export const updateSearchKeywords = (keywords) => ({
  type: UPDATE_SEARCH_KEYWORDS,
  keywords,

})
export const searchLoops = () => (dispatch, getState) => {
  const state = getState();
  const keywords = getSearchKeywords(state.loops);
  const filteredLoops = keywords
    ? loopsData.filter(
        loop => loop.title.toLowerCase().indexOf(keywords.toLowerCase()) > -1
      )
    : loopsData;
  dispatch({
    type: SEARCH_LOOPS,
    data: filteredLoops,
  });
};

export const addLoop = () => (dispatch, getState) => {
  const state = getState();
  const keywords = getSearchKeywords(state.loops);
  dispatch({
    type: ADD_LOOP,
    loop: {
      title: keywords,
      tags: [keywords],
    },
  })
}

// Getter
export const getSearchKeywords = state => state.searchKeywords;
export const getData = state => state.data;
