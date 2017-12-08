import { combineReducers } from 'redux';
import loopsMockData from 'common/mocks/loops';

// Actions
const UPDATE_SEARCH_KEYWORDS = 'UPDATE_SEARCH_KEYWORDS';
const SEARCH_LOOPS = 'SEARCH_LOOPS';

// Reducer
const searchKeywords = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_KEYWORDS:
      return action.keywords;
    default:
      return state;
  }
};

const data = (state = loopsMockData, action) => {
  switch (action.type) {
    case SEARCH_LOOPS:
      return action.data;
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
    ? loopsMockData.filter(
        loop => loop.title.toLowerCase().indexOf(keywords.toLowerCase()) > -1
      )
    : loopsMockData;
  dispatch({
    type: SEARCH_LOOPS,
    data: filteredLoops,
  });
};

// Getter
export const getSearchKeywords = state => state.searchKeywords;
export const getData = state => state.data;
