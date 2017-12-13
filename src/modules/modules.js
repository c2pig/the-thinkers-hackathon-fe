import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';
import { reducer as formReducer } from 'redux-form';

import loops, * as fromLoops from './loops';
import userReducer from './user';
import loopList, * as fromLoopList from './loopList';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['loops', 'user']
};

export default persistCombineReducers(persistConfig, {
  routing: routerReducer,
  form: formReducer,
  user: userReducer,
  loops,
  loopList
});

export const getLoopsData = state => fromLoops.getData(state.loops);

export const getLoopListSearchKeywords = state =>
  fromLoopList.getSearchKeywords(state.loopList);
export const getLoopListIds = state => fromLoopList.getIds(state.loopList);
export const getLoopListData = state => {
  const loopsData = getLoopsData(state);
  return getLoopListIds(state).map(id => loopsData[id] || {});
};
