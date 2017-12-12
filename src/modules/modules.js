import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';
import { reducer as formReducer } from 'redux-form';

import loops, * as fromLoops from './loops';
import userReducer from './user';

const persistConfig = {
  key: 'root',
  storage: localForage
};

export default persistCombineReducers(persistConfig, {
  routing: routerReducer,
  form: formReducer,
  user: userReducer,
  loops
});

// Selector
export const getLoopsSearchKeywords = state =>
  fromLoops.getSearchKeywords(state.loops);
export const getLoopsData = state => fromLoops.getData(state.loops);
